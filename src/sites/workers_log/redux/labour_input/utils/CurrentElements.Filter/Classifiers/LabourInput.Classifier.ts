import ModeClassifierInterface from '../Types/Mode.Classifier.Interface';
import CurrentElementsFilter from '../index';
import WorkersLog from '../../../../../types';
import ForgeViewer from '../../../../../../../components/ForgeViewer/types';
import { Options } from '../Types/Options';
import dayjs from 'dayjs';
import { GetObjectsByLevelType } from '../../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';
import { WorkersLogLabourInputColorMap } from '../../Constants';
import { hexToRgba } from '../../../../../../../utils/hexToRgb';

export class LabourInputClassifier extends ModeClassifierInterface {
	private readonly _storedLevel: string;
	private readonly _actualDate: string;
	constructor(
		element: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus,
		forgeID: number | undefined,
		obj: ReturnType<typeof CurrentElementsFilter.validateData>,
	) {
		super(element, forgeID, obj);
		this._storedLevel = obj.level;
		this._actualDate = obj.rotationDate;
	}

	Classify(callback: (revitID: string, forgeID: number | undefined, options: Options) => void): void {
		let options: Options;
		switch (true) {
			case this.elementIsOnDifferentLevel():
				options = {
					valid: false,
					addTo: [ForgeViewer.Payload.ElementOperationTypesEnum.HIDDEN],
					color: null,
				};
				break;
			case this.elementHasFinishedStatus():
				options = {
					valid: true,
					addTo: [ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE],
					color: this.ExtractColor(GetObjectsByLevelType.StatusEnum.Finished) || null,
				};
				break;
			case this.elementHasInProgressStatus():
				options = {
					valid: true,
					addTo: [ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE],
					color: this.ExtractColor(GetObjectsByLevelType.StatusEnum.InProgress) || null,
				};
				break;
			default:
				options = {
					valid: false,
					addTo: [ForgeViewer.Payload.ElementOperationTypesEnum.HIDDEN],
					color: null,
				};
		}
		callback(this._element.revit_id.toString(), this._forgeID, options);
	}

	ExtractColor(key: GetObjectsByLevelType.StatusEnum): ForgeViewer.Payload.Color | undefined {
		const color = WorkersLogLabourInputColorMap?.default?.[key];
		if (color) return hexToRgba(color.color, color.alpha, true);
	}

	private elementHasFinishedStatus() {
		const status = this._element.statuses.filter((x) => dayjs(x.date).isSameOrBefore(dayjs(this._actualDate)));
		if (status.length > 0) return status[0].status === GetObjectsByLevelType.StatusEnum.Finished;
		else return false;
	}
	private elementHasInProgressStatus() {
		const status = this._element.statuses.filter((x) => dayjs(x.date).isSameOrBefore(dayjs(this._actualDate)));
		if (status.length > 0) return status[0].status === GetObjectsByLevelType.StatusEnum.InProgress;
		else return false;
	}

	private elementIsOnDifferentLevel() {
		const level = this._element.level?.toString();
		return level !== this._storedLevel;
	}
}
