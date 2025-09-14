import type { Cell } from './table';

export type TableParams = {
	M: number; // rows
	N: number; // cols
	X: number; // nearest count
};

export type Matrix = Cell[][];

export type MatrixContext = {
	matrix: Matrix;
	setMatrix: (matrix: Matrix) => void;
	generateMatrix: (rows: number, cols: number) => void;
};
