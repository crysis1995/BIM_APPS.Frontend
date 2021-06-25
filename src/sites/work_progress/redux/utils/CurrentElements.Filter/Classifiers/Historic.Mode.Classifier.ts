import ModeClassifierInterface from '../Types/Mode.Classifier.Interface';
import ForgeViewer from '../../../../../../components/ForgeViewer/types';
import { Options } from '../Types/Options';
import { GetObjectsByLevelType } from '../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';
import CurrentElementsFilter from '../index';
import { Constants } from '../../../constants';
import { hexToRgba } from '../../../../../../utils/hexToRgb';
import dayjs from 'dayjs';

export class HistoricModeClassifier extends ModeClassifierInterface {
	private readonly _rotationDate: string;
	constructor(
		element: GetObjectsByLevelType.AcceptanceObject,
		forgeID: number | undefined,
		obj: ReturnType<typeof CurrentElementsFilter.validateData>,
	) {
		super(element, forgeID, obj);
		this._rotationDate = obj.rotationDate;
	}

	Classify(callback: (revitID: string, forgeID: number | undefined, options: Options) => void): void {
		let options: Options;
		switch (true) {
			case this.isContainStatusFinished():
				options = {
					valid: true,
					addTo: [ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE],
					color: this.ExtractColor(Constants.WorkProgressElementStatus.Finished, 0.5) || null,
					status: Constants.WorkProgressElementStatus.Finished,
				};
				break;
			case this.isContainStatusFinished(false):
				options = {
					valid: false,
					addTo: [
						ForgeViewer.Payload.ElementOperationTypesEnum.DISABLED,
						ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE,
					],
					color: this.ExtractColor(Constants.WorkProgressElementStatus.Finished, 1) || null,
				};
				break;
			case this.isContainStatusInProgress():
				options = {
					valid: true,
					addTo: [ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE],
					color: this.ExtractColor(Constants.WorkProgressElementStatus.InProgress, 0.5) || null,
					status: Constants.WorkProgressElementStatus.InProgress,
				};
				break;

			case this.isContainStatusInProgress(false):
				options = {
					valid: false,
					addTo: [
						ForgeViewer.Payload.ElementOperationTypesEnum.DISABLED,
						ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE,
					],
					color: this.ExtractColor(Constants.WorkProgressElementStatus.InProgress, 1) || null,
				};
				break;

			default:
				options = {
					valid: false,
					addTo: [ForgeViewer.Payload.ElementOperationTypesEnum.HIDDEN],
					color: null,
				};
				break;
		}

		callback(this._element.revit_id.toString(), this._forgeID, options);
	}

	ExtractColor(key: Constants.WorkProgressElementStatus, alpha?: number): ForgeViewer.Payload.Color | undefined {
		const color = Constants.WorkProgressMonolithicColorMap[Constants.MonolithicTabs.HISTORICAL]?.[key];
		if (color) return hexToRgba(color.color, alpha || color.alpha, true);
	}

	private isContainStatusFinished(isToday = true) {
		return !!this._element.statuses.find(
			(x) =>
				(isToday ? this.isRotationDateEqualStatusDate(x) : this.isRotationDayBeforeStatusDate(x)) &&
				x.status === GetObjectsByLevelType.StatusEnum.Finished,
		);
	}

	private isContainStatusInProgress(isToday = true) {
		return !!this._element.statuses.find(
			(x) =>
				(isToday ? this.isRotationDateEqualStatusDate(x) : this.isRotationDayBeforeStatusDate(x)) &&
				x.status === GetObjectsByLevelType.StatusEnum.InProgress,
		);
	}

	private isRotationDateEqualStatusDate(x: GetObjectsByLevelType.Status) {
		return x.date === this._rotationDate;
	}

	private isRotationDayBeforeStatusDate(x: GetObjectsByLevelType.Status) {
		return dayjs(x.date).isBefore(this._rotationDate);
	}
}
