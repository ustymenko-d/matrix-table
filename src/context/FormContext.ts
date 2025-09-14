import { createContext } from 'react';

import type { TFormContext } from '@/types/form';

export const FormContext = createContext<TFormContext | null>(null);
