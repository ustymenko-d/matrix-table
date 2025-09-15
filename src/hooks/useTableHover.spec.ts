/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { findNearestCells } from '@/utils/findNearestCells';

import useMatrixContext from './useMatrixContext';
import useTableContext from './useTableContext';
import { useTableHover } from './useTableHover';

vi.mock('./useMatrixContext');
vi.mock('./useTableContext');
vi.mock('@/utils/findNearestCells');

describe('useTableHover', () => {
	const mockMatrix = [[{ id: 1, amount: 100 }], [{ id: 2, amount: 200 }]];

	const setHoveredCell = vi.fn();
	const setHighlightedIds = vi.fn();
	const setHoveredSumRow = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();

		(useMatrixContext as any).mockReturnValue({ matrix: mockMatrix });
		(useTableContext as any).mockReturnValue({
			tableParams: { X: 1 },
			setHoveredCell,
			setHighlightedIds,
			setHoveredSumRow,
		});
		(findNearestCells as any).mockReturnValue([2]);

		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('handlePointerOver calls setHoveredCell and setHighlightedIds after debounce', () => {
		const { result } = renderHook(() => useTableHover());

		const td = document.createElement('td');
		td.dataset.row = '0';
		td.dataset.col = '0';

		act(() => {
			result.current.handlePointerOver({ target: td } as any);
		});

		expect(setHoveredCell).toHaveBeenCalledWith(mockMatrix[0][0]);
		expect(setHighlightedIds).not.toHaveBeenCalled();

		act(() => {
			vi.advanceTimersByTime(100);
		});

		expect(setHighlightedIds).toHaveBeenCalledWith([2]);
		expect(setHoveredSumRow).toHaveBeenCalledWith(null);
	});

	it('handlePointerLeave resets state', () => {
		const { result } = renderHook(() => useTableHover());

		act(() => {
			result.current.handlePointerLeave();
		});

		expect(setHoveredCell).toHaveBeenCalledWith(null);
		expect(setHighlightedIds).toHaveBeenCalledWith([]);
		expect(setHoveredSumRow).toHaveBeenCalledWith(null);
	});

	it('clears highlight when pointer moves outside tbody', () => {
		const { result } = renderHook(() => useTableHover());

		const tbody = document.createElement('tbody');
		document.body.appendChild(tbody);

		act(() => {
			(result.current.tbodyRef as any).current = tbody;
		});

		const event = new PointerEvent('pointermove', { bubbles: true });

		Object.defineProperty(event, 'target', {
			value: document.body,
			writable: false,
		});

		act(() => {
			document.dispatchEvent(event);
		});

		expect(setHoveredCell).toHaveBeenCalledWith(null);
		expect(setHighlightedIds).toHaveBeenCalledWith([]);
		expect(setHoveredSumRow).toHaveBeenCalledWith(null);

		document.body.removeChild(tbody);
	});
});
