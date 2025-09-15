import type { TableParams } from '@/context/TableContext';
import useTableContext from '@/hooks/useTableContext';

const Head = () => {
	const { tableParams } = useTableContext();
	const { N: cols } = tableParams as TableParams;

	return (
		<thead className='bg-muted text-center transition-colors'>
			<tr className='text-muted-foreground'>
				<th></th>
				{Array.from({ length: cols }).map((_, idx) => (
					<th key={idx}>C{idx + 1}</th>
				))}
				<th>Sum</th>
				<th>Actions</th>
			</tr>
		</thead>
	);
};

export default Head;
