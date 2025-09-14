import useFormContext from '@/hooks/useFormContext';

import FirstStep from './components/FirstStep';
import SecondStep from './components/SecondStep';
import Stepper from './components/Stepper';

const Form = () => {
	const { step, validateAndSubmit } = useFormContext();

	return (
		<section className='my-12 px-4'>
			<div className='flex max-w-xs flex-col gap-8'>
				<Stepper />
				<form
					onSubmit={(e) => {
						e.preventDefault();
						validateAndSubmit();
					}}>
					{step === 1 ? <FirstStep /> : <SecondStep />}
				</form>
			</div>
		</section>
	);
};

export default Form;
