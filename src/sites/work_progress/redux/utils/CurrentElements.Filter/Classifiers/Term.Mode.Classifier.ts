import ModeClassifierInterface from '../Types/Mode.Classifier.Interface';
import ForgeViewer from '../../../../../../components/ForgeViewer/types';
import { Options } from '../Types/Options';
import { GetObjectsByLevelType } from '../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';
import CurrentElementsFilter from '../index';

export class TermModeClassifier extends ModeClassifierInterface {
	constructor(
		element: GetObjectsByLevelType.AcceptanceObject,
		forgeID: number | undefined,
		obj: ReturnType<typeof CurrentElementsFilter.validateData>,
	) {
		super(element, forgeID, obj);
	}
	Classify(callback: (revitID: string, forgeID: number | undefined, options: Options) => void): void {

	}

	ExtractColor(key: any): ForgeViewer.Payload.Color | undefined {
		return undefined;
	}
}
