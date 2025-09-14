import { useMemo } from 'react';

import useMatrixContext from '@/hooks/useMatrixContext';
import useTableContext from '@/hooks/useTableContext';
import { calcPercentile } from '@/utils/calcPercentile';

const PercentileRow = () => {
	const { matrix } = useMatrixContext();
	const { tableParams } = useTableContext();

	const colsNumber = tableParams?.N ?? 0;

	const percentiles = useMemo(() => {
		const res: number[] = [];

		for (let c = 0; c < colsNumber; c++) {
			const colVals = matrix.map((row) => row[c]?.amount ?? 0);
			res.push(calcPercentile(colVals));
		}

		return res;
	}, [matrix, colsNumber]);

	return (
		<tr className='bg-muted'>
			<th>P</th>
			{percentiles.map((p, idx) => (
				<td key={idx}>{Math.floor(p * 10) / 10}</td>
			))}
			<td />
			<td />
		</tr>
	);
};

export default PercentileRow;
