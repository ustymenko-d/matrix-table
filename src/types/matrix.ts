import type { Cell, CellId } from './cell';

export type TableParams = {
	M: number; // rows
	N: number; // cols
	X: number; // nearest count
};

export type Matrix = Cell[][];

export type MatrixContext = {
	tableParams: TableParams | null;
	matrix: Matrix;
	setTableParams: (tableParams: TableParams) => void;
	setMatrix: (matrix: Matrix) => void;
	generateMatrix: (rows: number, cols: number) => void;
	addRow: () => void;
	removeRow: (row: number) => void;
	incrementCellById: (id: CellId) => void;
};
