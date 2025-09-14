import { createContext } from 'react';

import type { FormContext as TFormContext } from '@/types/form';

export const FormContext = createContext<TFormContext | null>(null);
