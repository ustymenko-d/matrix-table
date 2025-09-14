import type { Dispatch, SetStateAction } from 'react';

import type { Cell } from './table';

export type Matrix = Cell[][];

export type TMatrixContext = {
	matrix: Matrix;
	rowMaxVals: number[];
	setMatrix: Dispatch<SetStateAction<Matrix>>;
	generateMatrix: (rows: number, cols: number) => void;
};
