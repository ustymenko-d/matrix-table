import { createContext, type Dispatch, type SetStateAction } from 'react';

export type CellId = number;
export type CellValue = number;
export type Cell = { id: CellId; amount: CellValue };
export type Matrix = Cell[][];

export type TMatrixContext = {
	matrix: Matrix;
	rowMaxVals: number[];
	setMatrix: Dispatch<SetStateAction<Matrix>>;
	generateMatrix: (rows: number, cols: number) => void;
};

export const MatrixContext = createContext<TMatrixContext | null>(null);
