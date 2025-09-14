import useFormContext from '@/hooks/useFormContext';
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import Label from '@/ui/Label';

const FirstStep = () => {
	const { rows, cols, firstStepErrors, setRows, setCols, goNextStep } =
		useFormContext();

	return (
		<div className='grid gap-4'>
			<Label text='Number of Rows:'>
				<Input
					autoFocus
					type='number'
					min={1}
					max={100}
					value={rows}
					onChange={(e) => setRows(+e.target.value)}
					errors={firstStepErrors.rows}
				/>
			</Label>

			<Label text='Number of Columns:' className='mb-2'>
				<Input
					type='number'
					min={1}
					max={100}
					value={cols}
					onChange={(e) => setCols(+e.target.value)}
					errors={firstStepErrors.cols}
				/>
			</Label>

			<Button onClick={goNextStep} className='max-sm:col-span-2'>
				Next Step
			</Button>
		</div>
	);
};

export default FirstStep;
