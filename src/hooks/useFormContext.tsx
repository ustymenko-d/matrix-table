import { useContext } from 'react';

import { FormContext } from '@/context/FormContext';

const useFormContext = () => {
	const context = useContext(FormContext);

	if (!context) throw new Error('Use FormContext within provider!');

	return context;
};

export default useFormContext;
