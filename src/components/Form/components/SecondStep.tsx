import useFormContext from '@/hooks/useFormContext';
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import Label from '@/ui/Label';
import {
	handleNumberInputBlur,
	handleNumberInputChange,
} from '@/utils/handleNumberInput';

const SecondStep = () => {
	const { maxX, x, secondStepErrors, step, setX, goPrevStep } =
		useFormContext();

	return (
		<div className='grid gap-4'>
			<Label
				text='Number of cells where amount is closest to the amount of hovered cell:'
				className='mb-2'>
				<Input
					autoFocus
					type='number'
					min={1}
					max={maxX}
					value={x.toString()}
					onChange={handleNumberInputChange(setX)}
					onBlur={handleNumberInputBlur(setX, 1, maxX)}
					errors={secondStepErrors.x}
				/>
			</Label>

			<Button type='submit' disabled={step === 'Done'}>
				Generate Table
			</Button>

			<Button
				type='button'
				variant='secondary'
				onClick={goPrevStep}
				disabled={step === 'Done'}
				className='col-start-1'>
				Previous Step
			</Button>
		</div>
	);
};

export default SecondStep;
