import { type ReactNode, useState } from 'react';
import z from 'zod/v3';

import { FormContext } from '@/context/FormContext';
import useMatrixContext from '@/hooks/useMatrixContext';
import { FormValidation } from '@/schemas/form';
import type { Step } from '@/types/form';

const FormContextProvider = ({ children }: { children: ReactNode }) => {
	const { setTableParams, generateMatrix } = useMatrixContext();

	const [step, setStep] = useState<Step>(1);
	const [rows, setRows] = useState<number>(1);
	const [cols, setCols] = useState<number>(1);
	const [x, setX] = useState<number>(1);

	const [firstStepErrors, setFirstStepErrors] = useState<
		Record<string, string>
	>({});
	const [secondStepErrors, setSecondStepErrors] = useState<
		Record<string, string>
	>({});

	const totalCells = rows * cols;
	const maxX = Math.max(1, totalCells > 1 ? totalCells - 1 : 1);

	const goNextStep = () => {
		setFirstStepErrors({});

		try {
			FormValidation.firstStep.parse({ rows, cols });

			if (x > maxX) setX(maxX);

			setStep(2);
		} catch (error) {
			if (error instanceof z.ZodError) {
				const map: Record<string, string> = {};

				error.errors.forEach((e) => {
					if (e.path && e.path[0]) map[String(e.path[0])] = e.message;
				});

				setFirstStepErrors(map);
			}
		}
	};

	const goPrevStep = () => {
		setSecondStepErrors({});
		setStep(1);
	};

	const validateAndSubmit = () => {
		setSecondStepErrors({});

		try {
			FormValidation.firstStep.parse({ rows, cols });

			const parsed = FormValidation.secondStep.parse({ x });

			if (parsed.x > maxX) {
				setSecondStepErrors({ x: `X cannot be greater than ${maxX}` });
				return;
			}

			setTableParams({
				M: rows,
				N: cols,
				X: x,
			});
			generateMatrix(rows, cols);

			setStep(1);
		} catch (error) {
			if (error instanceof z.ZodError) {
				const map: Record<string, string> = {};

				error.errors.forEach((e) => {
					if (e.path && e.path[0]) map[String(e.path[0])] = e.message;
				});

				setSecondStepErrors(map);
			}
		}
	};

	return (
		<FormContext.Provider
			value={{
				step,
				rows,
				cols,
				x,
				totalCells,
				maxX,
				firstStepErrors,
				secondStepErrors,
				setRows,
				setCols,
				setX,
				goNextStep,
				goPrevStep,
				validateAndSubmit,
			}}>
			{children}
		</FormContext.Provider>
	);
};

export default FormContextProvider;
