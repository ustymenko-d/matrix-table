import useFormContext from '@/hooks/useFormContext';
import Step from '@/ui/Step';

const Stepper = () => {
	const { step } = useFormContext();

	return (
		<div className='flex flex-wrap items-center gap-20'>
			<Step
				isActive={step === 1}
				isCompleted={step === 2 || step === 'Done'}
				label='1'
				withConnector
			/>
			<Step isActive={step === 2} isCompleted={step === 'Done'} label='2' />
		</div>
	);
};

export default Stepper;
