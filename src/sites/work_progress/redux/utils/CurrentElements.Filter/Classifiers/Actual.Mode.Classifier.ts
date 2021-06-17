import ModeClassifierInterface from '../Types/Mode.Classifier.Interface';
import { Options } from '../Types/Options';
import { GetObjectsByLevelType } from '../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';
import CurrentElementsFilter from '../index';
import WorkProgress from '../../../../types';
import { GetStatusesType } from '../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetStatuses';
import ForgeViewer from '../../../../../../components/ForgeViewer/types';
import { Constants } from '../../../constants';
import { hexToRgba } from '../../../../../../utils/hexToRgb';

export class ActualModeClassifier extends ModeClassifierInterface {
	private readonly _rotationDay: number;
	private readonly _statuses: NonNullable<WorkProgress.Monolithic.General.Redux.IStore['statuses']>;
	private readonly _rotationDate: string;
	private readonly _statusName: GetStatusesType.DBStatuses | undefined;
	constructor(
		element: GetObjectsByLevelType.AcceptanceObject,
		forgeID: number,
		obj: ReturnType<typeof CurrentElementsFilter.validateData>,
	) {
		super(element, forgeID, obj);
		this._statuses = obj.statuses;
		this._rotationDate = obj.rotationDate;
		this._rotationDay = obj.rotationDay;
		this._statusName = this.ExtractLatestStatusName();
	}

	Classify(callback: (revitID: string, forgeID: number, options: Options) => void): void {
		let options: Options;
		switch (true) {
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
	private ElementIsFinished() {
		return this._statusName === GetStatusesType.DBStatuses.Finished;
	}

	private ElementIsInProgress() {
		return this._statusName === GetStatusesType.DBStatuses.InProgress;
	}
	private ExtractLatestStatus(): GetObjectsByLevelType.Status | undefined {
		if (this._element.statuses.length > 0) {
			return this._element.statuses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
		}
	}

	private ExtractLatestStatusName(): GetStatusesType.DBStatuses | undefined {
		const status = this.ExtractLatestStatus();
		if (status) return this._statuses[status.status.id].name;
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
