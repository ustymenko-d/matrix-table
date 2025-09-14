import { type ReactNode, useCallback, useMemo, useState } from 'react';

import { MatrixContext } from '@/context/MatrixContext';
import type { Matrix } from '@/types/matrix';
import type { Cell } from '@/types/table';
import { generateId } from '@/utils/generateId';
import { randomThreeDigit } from '@/utils/randomThreeDigit';

const MatrixContextProvider = ({ children }: { children: ReactNode }) => {
	const [matrix, setMatrix] = useState<Matrix>([]);

	const rowMaxVals = useMemo<number[]>(
		() => matrix.map((row) => Math.max(...row.map((cell) => cell.amount), 1)),
		[matrix]
	);

	const generateMatrix = useCallback((rows: number, cols: number) => {
		const newMatrix: Matrix = [];

		for (let r = 0; r < rows; r++) {
			const row: Cell[] = [];

			for (let c = 0; c < cols; c++) {
				row.push({ id: generateId(), amount: randomThreeDigit() });
			}

			newMatrix.push(row);
		}

		setMatrix(newMatrix);
	}, []);

	const contextValue = useMemo(
		() => ({
			matrix,
			rowMaxVals,
			setMatrix,
			generateMatrix,
		}),
		[matrix, rowMaxVals, generateMatrix]
	);

	return (
		<MatrixContext.Provider value={contextValue}>
			{children}
		</MatrixContext.Provider>
	);
};

export default MatrixContextProvider;
