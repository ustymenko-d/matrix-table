import { type ReactNode, useCallback, useMemo, useState } from 'react';

import { TableContext } from '@/context/TableContext';
import useMatrixContext from '@/hooks/useMatrixContext';
import type { Cell, CellId, TableParams } from '@/types/table';
import { generateId } from '@/utils/generateId';
import { randomThreeDigit } from '@/utils/randomThreeDigit';

const TableContextProvider = ({ children }: { children: ReactNode }) => {
	const { setMatrix } = useMatrixContext();

	const [tableParams, setTableParams] = useState<TableParams | null>(null);
	const [hoveredSumRow, setHoveredSumRow] = useState<number | null>(null);
	const [hoveredCell, setHoveredCell] = useState<Cell | null>(null);
	const [highlightedIds, setHighlightedIds] = useState<CellId[]>([]);

	const incrementCellByIndex = useCallback(
		(rowIdx: number, colIdx: number) => {
			setMatrix((prev) => {
				const newMatrix = [...prev];
				const newRow = [...newMatrix[rowIdx]];
				const cell = newRow[colIdx];

				newRow[colIdx] = { ...cell, amount: cell.amount + 1 };
				newMatrix[rowIdx] = newRow;
				return newMatrix;
			});
		},
		[setMatrix]
	);

	const addRow = useCallback(() => {
		if (!tableParams || tableParams.M >= 100) return;

		const newRow = Array.from({ length: tableParams.N }, () => ({
			id: generateId(),
			amount: randomThreeDigit(),
		}));

		setMatrix((prev) => [...prev, newRow]);
		setTableParams((prev) => prev && { ...prev, M: prev.M + 1 });
	}, [tableParams, setMatrix]);

	const removeRow = useCallback(
		(rowIndex: number) => {
			if (!tableParams || tableParams.M <= 0) return;

			setMatrix((prev) => prev.filter((_, i) => i !== rowIndex));
			setTableParams((prev) => prev && { ...prev, M: prev.M - 1 });
		},
		[tableParams, setMatrix]
	);

	const contextValue = useMemo(
		() => ({
			tableParams,
			hoveredSumRow,
			hoveredCell,
			highlightedIds,
			setTableParams,
			setHoveredSumRow,
			setHoveredCell,
			setHighlightedIds,
			incrementCellByIndex,
			addRow,
			removeRow,
		}),
		[
			tableParams,
			hoveredSumRow,
			hoveredCell,
			highlightedIds,
			incrementCellByIndex,
			addRow,
			removeRow,
		]
	);

	return (
		<TableContext.Provider value={contextValue}>
			{children}
		</TableContext.Provider>
	);
};

export default TableContextProvider;
