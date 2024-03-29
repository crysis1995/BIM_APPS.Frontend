import ModeClassifierInterface from '../Types/Mode.Classifier.Interface';
import { Options } from '../Types/Options';
import { GetObjectsByLevelType } from '../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';
import CurrentElementsFilter from '../index';
import ForgeViewer from '../../../../../../components/ForgeViewer/types';
import { Constants } from '../../../constants';
import { hexToRgba } from '../../../../../../utils/hexToRgb';

export class ActualModeClassifier extends ModeClassifierInterface {
	private readonly _rotationDay: number;
	private readonly _rotationDate: string;
	private readonly _statusName: GetObjectsByLevelType.StatusEnum | undefined;
	private readonly _storedLevel: string;
	constructor(
		element: GetObjectsByLevelType.AcceptanceObject,
		forgeID: number | undefined,
		obj: ReturnType<typeof CurrentElementsFilter.validateData>,
	) {
		super(element, forgeID, obj);
		this._rotationDate = obj.rotationDate;
		this._rotationDay = obj.rotationDay;
		this._statusName = this.ExtractLatestStatusName();
		this._storedLevel = obj.level;
	}

	Classify(callback: (revitID: string, forgeID: number | undefined, options: Options) => void): void {
		let options: Options;
		switch (true) {
			case !this.isElementOnActualLevel() || !this.isElementHaveValidRotationDay():
				options = {
					valid: false,
					addTo: [
						ForgeViewer.Payload.ElementOperationTypesEnum.DISABLED,
						ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE,
					],
					color: null,
				};
				break;
			case this.ElementIsFinished():
				if (this.ElementPlannedRotationDay().sameDayAsActualGlobal()) {
					options = {
						valid: true,
						addTo: [
							ForgeViewer.Payload.ElementOperationTypesEnum.DISABLED,
							ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE,
						],
						color: this.ExtractColor(Constants.WorkProgressElementStatus.Finished) || null,
						status: Constants.WorkProgressElementStatus.Finished,
					};
				} else {
					options = {
						valid: false,
						addTo: [
							ForgeViewer.Payload.ElementOperationTypesEnum.DISABLED,
							ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE,
						],
						color: this.ExtractColor(Constants.WorkProgressElementStatus.Finished) || null,
					};
				}
				break;
			case this.ElementIsInProgress():
				if (this.ElementPlannedRotationDay().lowerOrSameAsActualGlobal()) {
					options = {
						valid: true,
						addTo: [ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE],
						color: this.ExtractColor(Constants.WorkProgressElementStatus.InProgress) || null,
						status: Constants.WorkProgressElementStatus.InProgress,
					};
				} else {
					options = {
						valid: false,
						addTo: [ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE],
						color: this.ExtractColor(Constants.WorkProgressElementStatus.InProgress) || null,
					};
				}
				break;
			default:
				if (this.ElementPlannedRotationDay().higherAsActualGlobal()) {
					options = {
						valid: false,
						addTo: [ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE],
						color: this.ExtractColor(Constants.WorkProgressElementStatus.None) || null,
					};
				} else if (this.ElementPlannedRotationDay().lowerAsActualGlobal()) {
					options = {
						valid: true,
						addTo: [ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE],
						color: this.ExtractColor(Constants.WorkProgressElementStatus.Delayed) || null,
						status: Constants.WorkProgressElementStatus.Delayed,
					};
				} else {
					options = {
						valid: true,
						addTo: [ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE],
						color: this.ExtractColor(Constants.WorkProgressElementStatus.Current) || null,
						status: Constants.WorkProgressElementStatus.Current,
					};
				}
				break;
		}

		callback(this._element.revit_id.toString(), this._forgeID, options);
	}
	private isElementHaveValidRotationDay() {
		const currentElementRotationDay = this._element.rotation_day;
		return !!currentElementRotationDay?.rotation_day;
	}
	private isElementOnActualLevel() {
		const elementLevel = this._element.level;
		return elementLevel?.id === this._storedLevel;
	}
	private ElementIsFinished() {
		return this._statusName === GetObjectsByLevelType.StatusEnum.Finished;
	}

	private ElementIsInProgress() {
		return this._statusName === GetObjectsByLevelType.StatusEnum.InProgress;
	}
	private ExtractLatestStatus(): GetObjectsByLevelType.Status | undefined {
		if (this._element.statuses.length > 0) {
			return this._element.statuses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
		}
	}

	private ExtractLatestStatusName(): GetObjectsByLevelType.StatusEnum | undefined {
		const status = this.ExtractLatestStatus();
		if (status) return status.status;
	}

	private ElementPlannedRotationDay() {
		return {
			higherAsActualGlobal: () =>
				this._element.rotation_day ? this._element.rotation_day.rotation_day > this._rotationDay : false,
			higherOrSameAsActualGlobal: () =>
				this._element.rotation_day ? this._element.rotation_day.rotation_day >= this._rotationDay : false,
			lowerOrSameAsActualGlobal: () =>
				this._element.rotation_day ? this._element.rotation_day.rotation_day <= this._rotationDay : false,
			lowerAsActualGlobal: () =>
				this._element.rotation_day ? this._element.rotation_day.rotation_day < this._rotationDay : false,
			sameDayAsActualGlobal: () =>
				this._element.rotation_day ? this._element.rotation_day.rotation_day === this._rotationDay : false,
		};
	}

	public ExtractColor(key: Constants.WorkProgressElementStatus): ForgeViewer.Payload.Color | undefined {
		const color = Constants.WorkProgressMonolithicColorMap[Constants.MonolithicTabs.CURRENT]?.[key];
		if (color) return hexToRgba(color.color, color.alpha, true);
	}
}
