import type { ReactNode } from 'react';

import { buildProvidersTree } from '@/utils/buildProvidersTree';

import FormContextProvider from './FormContextProvider';
import MatrixContextProvider from './MatrixContextProvider';

const Tree = buildProvidersTree([
	[MatrixContextProvider],
	[FormContextProvider],
]);

const ProvidersTree = ({ children }: { children: ReactNode }) => (
	<Tree>{children}</Tree>
);

export default ProvidersTree;
