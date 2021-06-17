import { GetObjectsByLevelType } from '../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';
import CurrentElementsFilter from '../index';

export type Class<T> = new (
	element: GetObjectsByLevelType.AcceptanceObject,
	forgeID: number,
	obj: ReturnType<typeof CurrentElementsFilter.validateData>,
) => T;