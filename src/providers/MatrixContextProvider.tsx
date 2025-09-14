import { type ReactNode, useState } from 'react';

import { MatrixContext } from '@/context/MatrixContext';
import type { Matrix } from '@/types/matrix';
import type { Cell } from '@/types/table';
import { generateId } from '@/utils/generateId';
import { randomThreeDigit } from '@/utils/randomThreeDigit';

const MatrixContextProvider = ({ children }: { children: ReactNode }) => {
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

	return (
		<MatrixContext.Provider
			value={{
				matrix,
				setMatrix,
				generateMatrix,
			}}>
			{children}
		</MatrixContext.Provider>
	);
};

export default MatrixContextProvider;
