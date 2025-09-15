import { type ReactNode, useCallback, useMemo, useState } from 'react';

import { FormContext, type Step } from '@/context/FormContext';
import useMatrixContext from '@/hooks/useMatrixContext';
import useTableContext from '@/hooks/useTableContext';
import { FormValidation } from '@/schemas/form';
import { mapZodErrors } from '@/utils/mapZodErrors';

const FormContextProvider = ({ children }: { children: ReactNode }) => {
	const { setTableParams } = useTableContext();
	const { generateMatrix } = useMatrixContext();

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

	const totalCells = useMemo(() => rows * cols, [rows, cols]);
	const maxX = useMemo(
		() => Math.max(1, totalCells > 1 ? totalCells - 1 : 1),
		[totalCells]
	);

	const goNextStep = useCallback(() => {
		setFirstStepErrors({});
		const result = FormValidation.firstStep.safeParse({ rows, cols });

		if (!result.success) {
			setFirstStepErrors(mapZodErrors(result.error));
			return;
		}

		if (x > maxX) {
			setX(maxX);
		}
		setStep(2);
	}, [rows, cols, x, maxX]);

	const goPrevStep = useCallback(() => {
		setSecondStepErrors({});
		setStep(1);
	}, []);

	const validateAndSubmit = useCallback(() => {
		setSecondStepErrors({});
		const result = FormValidation.secondStep.safeParse({ x });

		if (!result.success) {
			setSecondStepErrors(mapZodErrors(result.error));
			return;
		}

		if (x > maxX) {
			setSecondStepErrors({ x: `X cannot be greater than ${maxX}` });
			return;
		}

		setTableParams({ M: rows, N: cols, X: x });
		generateMatrix(rows, cols);
		setStep('Done');
	}, [rows, cols, x, maxX, generateMatrix, setTableParams]);

	const contextValue = useMemo(
		() => ({
			step,
			rows,
			cols,
			x,
			totalCells,
			maxX,
			firstStepErrors,
			secondStepErrors,
			setStep,
			setRows,
			setCols,
			setX,
			goNextStep,
			goPrevStep,
			validateAndSubmit,
		}),
		[
			step,
			rows,
			cols,
			x,
			totalCells,
			maxX,
			firstStepErrors,
			secondStepErrors,
			goNextStep,
			goPrevStep,
			validateAndSubmit,
		]
	);

	return (
		<FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
	);
};

export default FormContextProvider;
