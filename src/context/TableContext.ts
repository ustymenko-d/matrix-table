import { createContext } from 'react';

import type { TTableContext } from '@/types/table';

export const TableContext = createContext<TTableContext | null>(null);
