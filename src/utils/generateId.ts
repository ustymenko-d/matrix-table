import type { CellId } from '@/types/cell';

let globalId: CellId = 1;

export const generateId = (): CellId => globalId++;
