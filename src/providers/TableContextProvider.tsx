import { type ReactNode, useState } from 'react';

import { TableContext } from '@/context/TableContext';
import useMatrixContext from '@/hooks/useMatrixContext';
import type { TableParams } from '@/types/matrix';
import type { Cell, CellId } from '@/types/table';
import { generateId } from '@/utils/generateId';
import { randomThreeDigit } from '@/utils/randomThreeDigit';

const TableContextProvider = ({ children }: { children: ReactNode }) => {
	const { matrix, setMatrix } = useMatrixContext();

	const [tableParams, setTableParams] = useState<TableParams | null>(null);

	function incrementCellById(id: CellId) {
		const updatedMatrix = matrix.map((row) =>
			row.map((cell) =>
				cell.id === id ? { ...cell, amount: cell.amount + 1 } : cell
			)
		);

		setMatrix(updatedMatrix);
	}

	function addRow() {
		if (!tableParams || tableParams.M >= 100) return;

		const newRow: Cell[] = [];

		for (let c = 0; c < tableParams.N; c++) {
			newRow.push({ id: generateId(), amount: randomThreeDigit() });
		}

		setTableParams({ ...tableParams, M: tableParams.M + 1 });
		setMatrix([...matrix, newRow]);
	}

	function removeRow(rowIndex: number) {
		const updatedMatrix = matrix.map((row) =>
			row.filter((_, i) => i !== rowIndex)
		);

		setMatrix(updatedMatrix);
	}

	return (
		<TableContext.Provider
			value={{
				tableParams,
				setTableParams,
				addRow,
				removeRow,
				incrementCellById,
			}}>
			{children}
		</TableContext.Provider>
	);
};

export default TableContextProvider;
