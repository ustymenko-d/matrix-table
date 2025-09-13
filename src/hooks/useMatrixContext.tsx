import { useContext } from 'react';

import { MatrixContext } from '@/context/MatrixContext';

const useMatrixContext = () => {
	const context = useContext(MatrixContext);

	if (!context) throw new Error('Use MatrixContext within provider!');

	return context;
};

export default useMatrixContext;
