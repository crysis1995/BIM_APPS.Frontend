import { Options } from './Options';
import CurrentElementsFilter from '../index';
import ForgeViewer from '../../../../../../../components/ForgeViewer/types';
import WorkersLog from '../../../../../types';

abstract class ModeClassifierInterface {
	_element: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus;
	_forgeID: number | undefined;
	constructor(
		element: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus,
		forgeID: number | undefined,
		obj: ReturnType<typeof CurrentElementsFilter.validateData>,
	) {
		this._element = element;
		this._forgeID = forgeID;
	}

	public abstract Classify(callback: (revitID: string, forgeID: number | undefined, options: Options) => void): void;
	public abstract ExtractColor(key: any): ForgeViewer.Payload.Color | undefined;
}
export default ModeClassifierInterface;
