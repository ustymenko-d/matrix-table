import { Trash2 } from 'lucide-react';

import useMatrixContext from '@/hooks/useMatrixContext';
import useTableContext from '@/hooks/useTableContext';
import { useTableHover } from '@/hooks/useTableHover';
import Button from '@/ui/Button';

import Cell from './Cell';
import PercentileRow from './PercentileRow';

const Body = () => {
	const { matrix, rowMaxVals } = useMatrixContext();
	const { tbodyRef, handlePointerOver, handlePointerLeave } = useTableHover();
	const { hoveredSumRow, removeRow } = useTableContext();

	return (
		<tbody
			ref={tbodyRef}
			onPointerOver={handlePointerOver}
			onPointerLeave={handlePointerLeave}>
			{matrix.map((row, rowIdx) => {
				const rowSum = row.reduce((sum, cell) => sum + cell.amount, 0);

				return (
					<tr key={row[0].id} className='border-x border-muted'>
						<th>R{rowIdx + 1}</th>
						{row.map((cell, idx) => {
							const displayPercent =
								hoveredSumRow === rowIdx
									? `${((cell.amount / rowSum) * 100).toFixed(1)}%`
									: null;

							return (
								<Cell
									key={cell.id}
									cell={cell}
									rowIdx={rowIdx}
									colIdx={idx}
									displayPercent={displayPercent}
									rowMax={rowMaxVals[rowIdx]}
								/>
							);
						})}
						<td
							data-row-sum={rowIdx}
							className='bg-muted font-medium'
							title={`Sum: ${rowSum}`}>
							{rowSum}
						</td>
						<td>
							<Button variant='destructive' onClick={() => removeRow(rowIdx)}>
								<Trash2 />
							</Button>
						</td>
					</tr>
				);
			})}

			<PercentileRow />
		</tbody>
	);
};

export default Body;
