import ModeClassifierInterface from '../Types/Mode.Classifier.Interface';
import CurrentElementsFilter from '../index';
import ForgeViewer from '../../../../../../../components/ForgeViewer/types';
import { Options } from '../Types/Options';
import { hexToRgba } from '../../../../../../../utils/hexToRgb';
import { Constants } from '../../../../constants';
import { ElementType } from '../Types/ElementType';
import { GetObjectsByLevelType } from '../../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';

export class GeneralConstructionClassifier extends ModeClassifierInterface {
	constructor(
		element: ElementType,
		forgeID: number | undefined,
		obj: ReturnType<typeof CurrentElementsFilter.validateData>,
	) {
		super(element, forgeID, obj);
	}

	Classify(callback: (revitID: string, forgeID: number | undefined, options: Options) => void): void {
		let options: Options;
		switch (true) {
			case this.ElementHasInProgressStatus():
				options = {
					valid: false,
					addTo: [
						ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE,
						ForgeViewer.Payload.ElementOperationTypesEnum.COLORED,
					],
					color: this.ExtractColor(Constants.WorkProgressElementStatus.InProgress) || null,
				};
				break;
			case this.ElementHasFinishedStatus():
				options = {
					valid: true,
					addTo: [
						ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE,
						ForgeViewer.Payload.ElementOperationTypesEnum.COLORED,
					],
					color: this.ExtractColor(Constants.WorkProgressElementStatus.Finished) || null,
				};
				break;

			default:
				options = {
					valid: false,
					addTo: [
						// ForgeViewer.Payload.ElementOperationTypesEnum.DISABLED,
						ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE,
					],
					color: null,
				};
		}
		callback(this._element.revit_id.toString(), this._forgeID, options);
	}

	ExtractColor(key: Constants.WorkProgressElementStatus): ForgeViewer.Payload.Color | undefined {
		const color = Constants.WorkProgressGeneralConstructionColorMap?.[key];
		if (color) return hexToRgba(color.color, color.alpha, true);
	}

	private ElementHasInProgressStatus() {
		const status = this.ExtractStatus();
		return status && status.status === GetObjectsByLevelType.StatusEnum.InProgress;
	}
	private ElementHasFinishedStatus() {
		const status = this.ExtractStatus();
		return status && status.status === GetObjectsByLevelType.StatusEnum.Finished;
	}

	private ExtractStatus() {
		const revitID = this._element.revit_id;
		const status = this._statusesByRevitID[revitID];
		if (status) return status;
	}
}
