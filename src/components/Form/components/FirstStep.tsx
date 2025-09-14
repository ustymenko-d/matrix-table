import useFormContext from '@/hooks/useFormContext';
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import Label from '@/ui/Label';
import { handleNumberInputChange } from '@/utils/handleNumberInput';

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
					onInput={handleNumberInputChange(setRows)}
					errors={firstStepErrors.rows}
				/>
			</Label>

			<Label text='Number of Columns:' className='mb-2'>
				<Input
					type='number'
					min={1}
					max={100}
					value={cols}
					onInput={handleNumberInputChange(setCols)}
					errors={firstStepErrors.cols}
				/>
			</Label>

			<Button onClick={goNextStep}>Next Step</Button>
		</div>
	);
};

export default FirstStep;
