import { Options } from './Options';
import CurrentElementsFilter from '../index';
import ForgeViewer from '../../../../../../../components/ForgeViewer/types';
import WorkProgress from '../../../../../types';
import { GetPrefabricatedObjectsType } from '../../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetPrefabObjects';
import { ElementType } from './ElementType';

abstract class ModeClassifierInterface {
	_element: ElementType;
	_forgeID: number | undefined;
	_statusesByRevitID: NonNullable<WorkProgress.GeneralConstruction.Objects.Redux.IStore['ObjectStatusAll']>;
	constructor(
		element: ElementType,
		forgeID: number | undefined,
		obj: ReturnType<typeof CurrentElementsFilter.validateData>,
	) {
		this._element = element;
		this._forgeID = forgeID;
		this._statusesByRevitID = obj.statusesByRevitID;
	}

	public abstract Classify(callback: (revitID: string, forgeID: number | undefined, options: Options) => void): void;
	public abstract ExtractColor(key: any): ForgeViewer.Payload.Color | undefined;
}
export default ModeClassifierInterface;
