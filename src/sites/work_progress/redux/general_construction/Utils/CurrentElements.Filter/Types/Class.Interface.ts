import CurrentElementsFilter from '../index';
import { ElementType } from './ElementType';

export type Class<T> = new (
	element: ElementType,
	forgeID: number | undefined,
	obj: ReturnType<typeof CurrentElementsFilter.validateData>,
) => T;
