import { Options } from './Options';
import CurrentElementsFilter from '../index';
import ForgeViewer from '../../../../../../../components/ForgeViewer/types';
import WorkProgress from '../../../../../types';
import { GetPrefabricatedObjectsType } from '../../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetPrefabObjects';

abstract class ModeClassifierInterface {
	_element: GetPrefabricatedObjectsType.AcceptanceObject;
	_forgeID: number | undefined;
	_statusesByRevitID: NonNullable<WorkProgress.Prefabricated.Objects.Redux.IStore['statusesByRevitID']>;
	_allStatuses: NonNullable<WorkProgress.Prefabricated.Objects.Redux.IStore['allStatuses']>;
	constructor(
		element: GetPrefabricatedObjectsType.AcceptanceObject,
		forgeID: number | undefined,
		obj: ReturnType<typeof CurrentElementsFilter.validateData>,
	) {
		this._element = element;
		this._forgeID = forgeID;
		this._statusesByRevitID = obj.statusesByRevitID;
		this._allStatuses = obj.allStatuses;
	}

	public abstract Classify(callback: (revitID: string, forgeID: number | undefined, options: Options) => void): void;
	public abstract ExtractColor(key: any): ForgeViewer.Payload.Color | undefined;
}
export default ModeClassifierInterface;
