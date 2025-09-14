import { createContext } from 'react';

import type { TMatrixContext } from '@/types/matrix';

export const MatrixContext = createContext<TMatrixContext | null>(null);
