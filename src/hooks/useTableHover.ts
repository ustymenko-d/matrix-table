import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import {
	type MouseEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from 'react';

import { findNearestCells } from '@/utils/findNearestCells';

import useMatrixContext from './useMatrixContext';
import useTableContext from './useTableContext';

export const useTableHover = (throttleMs = 50, debounceMs = 100) => {
	const { matrix } = useMatrixContext();
	const { tableParams, setHoveredCell, setHighlightedIds, setHoveredSumRow } =
		useTableContext();

	const tbodyRef = useRef<HTMLTableSectionElement>(null);

	const debouncedHighlight = useMemo(
		() =>
			debounce((cell, X: number) => {
				const nearest = findNearestCells(cell, matrix, X);
				setHighlightedIds(nearest);
				setHoveredSumRow(null);
			}, debounceMs),
		[matrix, setHighlightedIds, setHoveredSumRow, debounceMs]
	);

	const throttledMove = useMemo(
		() =>
			throttle((e: MouseEvent<HTMLTableSectionElement>) => {
				const cellEl = (e.target as HTMLElement).closest('td');

				if (!cellEl) {
					setHoveredCell(null);
					setHighlightedIds([]);
					setHoveredSumRow(null);
					return;
				}

				if (cellEl.dataset.row && cellEl.dataset.col) {
					const rowIdx = +cellEl.dataset.row!;
					const colIdx = +cellEl.dataset.col!;
					const cell = matrix[rowIdx][colIdx];

					setHoveredCell(cell);
					debouncedHighlight(cell, tableParams?.X ?? 0);
				} else if (cellEl.dataset.rowSum) {
					setHoveredCell(null);
					debouncedHighlight.cancel();
					setHighlightedIds([]);
					setHoveredSumRow(+cellEl.dataset.rowSum!);
				} else {
					setHoveredCell(null);
					debouncedHighlight.cancel();
					setHighlightedIds([]);
					setHoveredSumRow(null);
				}
			}, throttleMs),
		[
			matrix,
			tableParams?.X,
			setHoveredCell,
			setHighlightedIds,
			setHoveredSumRow,
			debouncedHighlight,
			throttleMs,
		]
	);

	useEffect(() => {
		return () => {
			debouncedHighlight.cancel();
			throttledMove.cancel();
		};
	}, [debouncedHighlight, throttledMove]);

	const handlePointerOver = useCallback(
		(e: React.MouseEvent<HTMLTableSectionElement>) => {
			throttledMove(e);
		},
		[throttledMove]
	);

	const handlePointerLeave = useCallback(() => {
		debouncedHighlight.cancel();
		throttledMove.cancel();
		setHoveredCell(null);
		setHighlightedIds([]);
		setHoveredSumRow(null);
	}, [
		debouncedHighlight,
		throttledMove,
		setHoveredCell,
		setHighlightedIds,
		setHoveredSumRow,
	]);

	useEffect(() => {
		const onPointerMove = (e: PointerEvent) => {
			const tbody = tbodyRef.current;
			if (tbody && e.target instanceof Node && !tbody.contains(e.target)) {
				handlePointerLeave();
			}
		};

		document.addEventListener('pointermove', onPointerMove);

		return () => document.removeEventListener('pointermove', onPointerMove);
	}, [handlePointerLeave]);

	return { tbodyRef, handlePointerOver, handlePointerLeave };
};
