import type { CellId } from '@/types/table';

let globalId: CellId = 1;

export const generateId = (): CellId => globalId++;
