import CurrentElementsFilter from '../index';
import { GetPrefabricatedObjectsType } from '../../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetPrefabObjects';

export type Class<T> = new (
	element: GetPrefabricatedObjectsType.AcceptanceObject,
	forgeID: number | undefined,
	obj: ReturnType<typeof CurrentElementsFilter.validateData>,
) => T;
