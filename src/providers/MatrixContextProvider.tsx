import { type ReactNode, useState } from 'react';

import { MatrixContext } from '@/context/MatrixContext';
import type { Cell, CellId } from '@/types/cell';
import type { Matrix, TableParams } from '@/types/matrix';
import { generateId } from '@/utils/generateId';
import { randomThreeDigit } from '@/utils/randomThreeDigit';

const MatrixContextProvider = ({ children }: { children: ReactNode }) => {
	const [tableParams, setTableParams] = useState<TableParams | null>(null);
	const [matrix, setMatrix] = useState<Matrix>([]);

	function generateMatrix(rows: number, cols: number) {
		const matrix: Matrix = [];

		for (let r = 0; r < rows; r++) {
			const row: Cell[] = [];

			for (let c = 0; c < cols; c++) {
				row.push({ id: generateId(), amount: randomThreeDigit() });
			}

			matrix.push(row);
		}

		setMatrix(matrix);
	}

	function incrementCellById(id: CellId) {
		setMatrix((prev) =>
			prev.map((row) =>
				row.map((cell) =>
					cell.id === id ? { ...cell, amount: cell.amount + 1 } : cell
				)
			)
		);
	}

	function addRow() {
		if (!tableParams) return;

		setMatrix((prev) => {
			if (tableParams.M >= 100) return prev;

			const newRow: Cell[] = [];

			for (let c = 0; c < tableParams.N; c++)
				newRow.push({ id: generateId(), amount: randomThreeDigit() });

			setTableParams((prev) => (prev ? { ...prev, M: prev.M + 1 } : null));

			return [...prev, newRow];
		});
	}

	function removeRow(rowIndex: number) {
		setMatrix((prev) => prev.filter((_, i) => i !== rowIndex));
	}

	return (
		<MatrixContext.Provider
			value={{
				tableParams,
				setTableParams,
				matrix,
				setMatrix,
				generateMatrix,
				incrementCellById,
				addRow,
				removeRow,
			}}>
			{children}
		</MatrixContext.Provider>
	);
};

export default MatrixContextProvider;
