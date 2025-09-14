import type { ReactNode } from 'react';

import { buildProvidersTree } from '@/utils/buildProvidersTree';

import FormContextProvider from './FormContextProvider';
import MatrixContextProvider from './MatrixContextProvider';
import TableContextProvider from './TableContextProvider';

const Tree = buildProvidersTree([
	[MatrixContextProvider],
	[TableContextProvider],
	[FormContextProvider],
]);

const ProvidersTree = ({ children }: { children: ReactNode }) => (
	<Tree>{children}</Tree>
);

export default ProvidersTree;
