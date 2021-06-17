import { GetObjectsByLevelType } from '../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';
import { Options } from './Options';
import CurrentElementsFilter from '../index';
import ForgeViewer from '../../../../../../components/ForgeViewer/types';

abstract class ModeClassifierInterface {
	_element: GetObjectsByLevelType.AcceptanceObject;
	_forgeID: number;
	constructor(
		element: GetObjectsByLevelType.AcceptanceObject,
		forgeID: number,
		obj: ReturnType<typeof CurrentElementsFilter.validateData>,
	) {
		this._element = element;
		this._forgeID = forgeID;
	}

	public abstract Classify(callback: (revitID: string, forgeID: number, options: Options) => void): void;
	public abstract ExtractColor(key: any): ForgeViewer.Payload.Color | undefined ;
}
export default ModeClassifierInterface;
