import { createContext } from 'react';
import type z from 'zod/v3';

import type { FormValidation } from '@/schemas/form';

export type Step = 1 | 2 | 'Done';
export type FirstStepValues = z.infer<typeof FormValidation.firstStep>;
export type SecondStepValues = z.infer<typeof FormValidation.secondStep>;

export type TFormContext = {
	step: Step;
	rows: number;
	cols: number;
	x: number;
	totalCells: number;
	maxX: number;
	firstStepErrors: Record<string, string>;
	secondStepErrors: Record<string, string>;
	setStep: (s: Step) => void;
	setRows: (v: number) => void;
	setCols: (v: number) => void;
	setX: (v: number) => void;
	goNextStep: () => void;
	goPrevStep: () => void;
	validateAndSubmit: () => void;
};

export const FormContext = createContext<TFormContext | null>(null);
