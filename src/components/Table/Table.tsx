import useFormContext from '@/hooks/useFormContext';
import useMatrixContext from '@/hooks/useMatrixContext';
import useTableContext from '@/hooks/useTableContext';
import Button from '@/ui/Button';

import Body from './components/Body';
import Head from './components/Head';

const Table = () => {
	const { tableParams, addRow, setTableParams } = useTableContext();
	const { setMatrix } = useMatrixContext();
	const { setStep } = useFormContext();

	return (
		<section className='my-12 px-4'>
			<div className='flex flex-col items-start gap-4'>
				<div className='max-w-full overflow-x-auto pb-4'>
					<table className='border-collapse overflow-hidden rounded-md text-base'>
						<Head />
						<Body />
					</table>
				</div>

				<div className='flex flex-wrap items-center gap-4'>
					<Button
						variant='outline'
						onClick={addRow}
						disabled={!tableParams || tableParams.M >= 100}>
						Add row
					</Button>
					<Button
						variant='destructive'
						onClick={() => {
							setMatrix([]);
							setTableParams(null);
							setStep(1);
						}}>
						Delete Table
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Table;
