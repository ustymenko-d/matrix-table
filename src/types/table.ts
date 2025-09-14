import type { TableParams } from './matrix';

export type CellId = number;
export type CellValue = number;
export type Cell = { id: CellId; amount: CellValue };

export type TableContext = {
	tableParams: TableParams | null;
	setTableParams: (tableParams: TableParams) => void;
	addRow: () => void;
	removeRow: (row: number) => void;
	incrementCellById: (id: CellId) => void;
};
