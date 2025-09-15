import { describe, expect, it } from 'vitest';

import type { Cell } from '@/context/MatrixContext';

import { findNearestCells } from './findNearestCells';

describe('findNearestCells', () => {
	it('finds nearest cells by amount', () => {
		const matrix = [
			[
				{ id: 1, amount: 100 },
				{ id: 2, amount: 110 },
			],
			[
				{ id: 3, amount: 120 },
				{ id: 4, amount: 130 },
			],
		];
		const target: Cell = { id: 1, amount: 100 };

		const result = findNearestCells(target, matrix, 2);
		expect(result).toEqual([2, 3]);
	});

	it('does not include target id', () => {
		const matrix = [
			[
				{ id: 1, amount: 50 },
				{ id: 2, amount: 55 },
			],
		];
		const target: Cell = { id: 1, amount: 50 };
		const result = findNearestCells(target, matrix, 1);
		expect(result).not.toContain(1);
	});
});
