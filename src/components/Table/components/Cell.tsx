import clsx from 'clsx';

import useTableContext from '@/hooks/useTableContext';
import type { Cell as TCell } from '@/types/table';

type Props = {
	cell: TCell;
	rowMax: number;
	displayPercent?: string | null;
	rowIdx: number;
	colIdx: number;
};

const Cell = ({ cell, rowMax, rowIdx, colIdx, displayPercent }: Props) => {
	const { highlightedIds, hoveredSumRow, incrementCellByIndex } =
		useTableContext();

	const { id, amount } = cell;

	const highlighted = highlightedIds.includes(id);

	const handleClick = () => {
		if (amount === 999) return;
		incrementCellByIndex(rowIdx, colIdx);
	};

	const heatPct =
		hoveredSumRow === rowIdx && rowMax
			? Math.round((amount / rowMax) * 100)
			: 0;

	return (
		<td
			data-row={rowIdx}
			data-col={colIdx}
			onClick={handleClick}
			className={clsx(
				amount < 999 ? 'cursor-pointer' : 'cursor-not-allowed',
				highlighted && 'bg-muted'
			)}
			// style={{
			// 	backgroundColor:
			// 		hoveredSumRow === rowIdx
			// 			? `rgba(120, 120, 120, ${heatPct / 100})`
			// 			: undefined,
			// }}
			style={{
				backgroundImage:
					hoveredSumRow === rowIdx
						? `linear-gradient(to top, rgba(120, 120, 120,0.3) ${heatPct}%, transparent ${heatPct}%)`
						: undefined,
			}}>
			<div className='text-sm'>{displayPercent ?? amount}</div>
		</td>
	);
};

export default Cell;
