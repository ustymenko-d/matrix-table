import { useContext } from 'react';

import { TableContext } from '@/context/TableContext';

const useTableContext = () => {
	const context = useContext(TableContext);

	if (!context) throw new Error('Use TableContext within provider!');

	return context;
};

export default useTableContext;
