import type { Cell, CellId } from '@/types/table';

export function findNearestCells(
	target: Cell,
	matrix: Cell[][],
	count: number
): CellId[] {
	const MAX_DIFF = 999 - 100;
	const buckets: CellId[][] = Array.from({ length: MAX_DIFF + 1 }, () => []);

	const tId = target.id;
	const tAmt = target.amount;

	for (const row of matrix) {
		for (const cell of row) {
			if (cell.id === tId) continue;
			const d = Math.abs(cell.amount - tAmt);
			buckets[d].push(cell.id);
		}
	}

	const result: CellId[] = [];
	for (let d = 0; d <= MAX_DIFF && result.length < count; d++) {
		const b = buckets[d];
		for (let i = 0; i < b.length && result.length < count; i++) {
			result.push(b[i]);
		}
	}
	return result;
}
