import { createContext } from 'react';

import type { MatrixContext as TMatrixContext } from '@/types/matrix';

export const MatrixContext = createContext<TMatrixContext | null>(null);
