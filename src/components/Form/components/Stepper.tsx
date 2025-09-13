import useFormContext from '@/hooks/useFormContext';
import Step from '@/ui/Step';

const Stepper = () => {
	const { step } = useFormContext();

	return (
		<div className='flex flex-wrap items-center gap-20'>
			<Step
				isActive={step === 1}
				isCompleted={step > 1}
				label='1'
				withConnector
			/>
			<Step isActive={step === 2} isCompleted={false} label='2' />
		</div>
	);
};

export default Stepper;
