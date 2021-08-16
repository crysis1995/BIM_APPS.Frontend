import CurrentElementsFilter from '../index';
import WorkersLog from '../../../../../types';

export type Class<T> = new (
	element: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus,
	forgeID: number | undefined,
	obj: ReturnType<typeof CurrentElementsFilter.validateData>,
) => T;
