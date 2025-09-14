export type CellId = number;
export type CellValue = number;
export type Cell = { id: CellId; amount: CellValue };

export type TableParams = {
	M: number; // rows
	N: number; // cols
	X: number; // nearest count
};

export type TTableContext = {
	tableParams: TableParams | null;
	hoveredSumRow: number | null;
	hoveredCell: Cell | null;
	highlightedIds: number[];
	setTableParams: (tableParams: TableParams | null) => void;
	setHoveredSumRow: (rowIdx: number | null) => void;
	setHoveredCell: (cell: Cell | null) => void;
	setHighlightedIds: (ids: number[]) => void;
	addRow: () => void;
	removeRow: (row: number) => void;
	incrementCellByIndex: (row: number, col: number) => void;
};
