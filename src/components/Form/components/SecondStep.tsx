import useFormContext from '@/hooks/useFormContext';
import Button from '@/ui/Button';
import Input from '@/ui/Input';
import Label from '@/ui/Label';
import { clamp } from '@/utils/clamp';

const SecondStep = () => {
	const { maxX, x, secondStepErrors, setX, goPrevStep } = useFormContext();

	return (
		<div className='grid grid-cols-2 gap-x-4 gap-y-6'>
			<Label
				text='Number of cells where amount is closest to the amount of hovered cell:'
				className='max-sm:col-span-2'>
				<Input
					type='number'
					min={1}
					max={maxX}
					value={x}
					onChange={(e) => setX(clamp(+e.target.value, 1, maxX))}
					errors={secondStepErrors.x}
				/>
			</Label>

			<Button
				type='button'
				variant='secondary'
				onClick={goPrevStep}
				className='col-start-1'>
				Previous Step
			</Button>

			<Button type='submit'>Generate Table</Button>
		</div>
	);
};

export default SecondStep;
