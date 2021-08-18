import ModeClassifierInterface from '../Types/Mode.Classifier.Interface';
import CurrentElementsFilter from '../index';
import ForgeViewer from '../../../../../../../components/ForgeViewer/types';
import { Options } from '../Types/Options';
import { hexToRgba } from '../../../../../../../utils/hexToRgb';
import { GetPrefabricatedObjectsType } from '../../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetPrefabObjects';
import { Constants } from '../../../../constants';
import { GetPrefabObjectsStatusesType } from '../../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetPrefabObjectsStatuses';

export class LabourInputClassifier extends ModeClassifierInterface {
	constructor(
		element: GetPrefabricatedObjectsType.AcceptanceObject,
		forgeID: number | undefined,
		obj: ReturnType<typeof CurrentElementsFilter.validateData>,
	) {
		super(element, forgeID, obj);
	}

	Classify(callback: (revitID: string, forgeID: number | undefined, options: Options) => void): void {
		let options: Options;
		switch (true) {
			case this.ElementHasApprovedStatus():
				options = {
					valid: false,
					addTo: [
						ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE,
						ForgeViewer.Payload.ElementOperationTypesEnum.COLORED,
					],
					color: this.ExtractColor(Constants.WorkProgressPrefabricatedElementStatus.Approved) || null,
				};
				break;
			case this.ElementHasCreatedStatus():
				options = {
					valid: true,
					addTo: [
						ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE,
						ForgeViewer.Payload.ElementOperationTypesEnum.COLORED,
					],
					color: this.ExtractColor(Constants.WorkProgressPrefabricatedElementStatus.Created) || null,
				};
				break;
			case this.ElementHasMountedStatus():
				options = {
					valid: true,
					addTo: [
						ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE,
						ForgeViewer.Payload.ElementOperationTypesEnum.COLORED,
					],
					color: this.ExtractColor(Constants.WorkProgressPrefabricatedElementStatus.Mounted) || null,
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

	ExtractColor(key: Constants.WorkProgressPrefabricatedElementStatus): ForgeViewer.Payload.Color | undefined {
		const color = Constants.WorkProgressPrefabricatedColorMap?.[key];
		if (color) return hexToRgba(color.color, color.alpha, true);
	}

	private ElementHasApprovedStatus() {
		const status = this.ExtractStatus();
		return status && status.status === GetPrefabObjectsStatusesType.PrefabStatusEnum.Approved;
	}
	private ElementHasCreatedStatus() {
		const status = this.ExtractStatus();
		return status && status.status === GetPrefabObjectsStatusesType.PrefabStatusEnum.Created;
	}
	private ElementHasMountedStatus() {
		const status = this.ExtractStatus();
		return status && status.status === GetPrefabObjectsStatusesType.PrefabStatusEnum.Mounted;
	}

	private ExtractStatus() {
		const revitID = this._element.revit_id;
		const statusID = this._statusesByRevitID[revitID]?.[this._statusesByRevitID[revitID].length - 1];
		if (statusID) return this._allStatuses[statusID];
	}
}
