import { createContext } from 'react';

import type { TableContext as TTableContext } from '@/types/table';

export const TableContext = createContext<TTableContext | null>(null);
