import ModeClassifierInterface from '../Types/Mode.Classifier.Interface';
import { GetObjectsByLevelType } from '../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';
import CurrentElementsFilter from '../index';
import { Options } from '../Types/Options';
import ForgeViewer from '../../../../../../components/ForgeViewer/types';
import { Constants } from '../../../constants';
import { hexToRgba } from '../../../../../../utils/hexToRgb';

export class ScheduledModeClassifier extends ModeClassifierInterface {
	private readonly _rotationDay: number;
	constructor(
		element: GetObjectsByLevelType.AcceptanceObject,
		forgeID: number,
		obj: ReturnType<typeof CurrentElementsFilter.validateData>,
	) {
		super(element, forgeID, obj);
		this._rotationDay = obj.rotationDay;
	}

	public Classify(callback: (revitID: string, forgeID: number, options: Options) => void): void {
		let options: Options;
		switch (true) {
			case this.isObjectPlannedDay().higherThanGlobalDay():
				options = {
					valid: false,
					addTo: [ForgeViewer.Payload.ElementOperationTypesEnum.HIDDEN],
					color: null,
				};
				break;
			case this.isObjectPlannedDay().lowerThanGlobalDay():
				options = {
					valid: false,
					addTo: [
						ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE,
						ForgeViewer.Payload.ElementOperationTypesEnum.DISABLED,
					],
					color: this.ExtractColor(Constants.WorkProgressElementStatus.Finished) || null,
				};
				break;
			default:
				options = {
					valid: true,
					addTo: [ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE],
					color: this.ExtractColor(Constants.WorkProgressElementStatus.Planned) || null,
				};
		}

		callback(this._element.revit_id.toString(), this._forgeID, options);
	}

	private isObjectPlannedDay() {
		return {
			higherThanGlobalDay: () =>
				this._element.rotation_day ? this._element.rotation_day.rotation_day > this._rotationDay : false,
			higherOrSameThanGlobalDay: () =>
				this._element.rotation_day ? this._element.rotation_day.rotation_day >= this._rotationDay : false,
			lowerThanGlobalDay: () =>
				this._element.rotation_day ? this._element.rotation_day.rotation_day < this._rotationDay : false,
			equalGlobalDay: () =>
				this._element.rotation_day ? this._element.rotation_day.rotation_day === this._rotationDay : false,
		};
	}

	public ExtractColor(key: Constants.WorkProgressElementStatus): ForgeViewer.Payload.Color | undefined {
		const color = Constants.WorkProgressMonolithicColorMap[Constants.MonolithicTabs.SCHEDULED]?.[key];
		if (color) return hexToRgba(color.color, color.alpha,true);
	}
}
