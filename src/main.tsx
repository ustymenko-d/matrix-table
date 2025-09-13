import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import ProvidersTree from '@/providers/ProvidersTree.tsx';

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ProvidersTree>
			<App />
		</ProvidersTree>
	</StrictMode>
);
