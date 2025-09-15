import useFormContext from '@/hooks/useFormContext';
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import Label from '@/ui/Label';
import {
	handleNumberInputBlur,
	handleNumberInputChange,
} from '@/utils/handleNumberInput';

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
					value={rows.toString()}
					onChange={handleNumberInputChange(setRows)}
					onBlur={handleNumberInputBlur(setRows)}
					errors={firstStepErrors.rows}
				/>
			</Label>

			<Label text='Number of Columns:' className='mb-2'>
				<Input
					type='number'
					min={1}
					max={100}
					value={cols.toString()}
					onInput={handleNumberInputChange(setCols)}
					onBlur={handleNumberInputBlur(setCols)}
					errors={firstStepErrors.cols}
				/>
			</Label>

			<Button onClick={goNextStep}>Next Step</Button>
		</div>
	);
};

export default FirstStep;
