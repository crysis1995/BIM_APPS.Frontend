import ModeClassifierInterface from '../Types/Mode.Classifier.Interface';
import { GetObjectsByLevelType } from '../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';
import CurrentElementsFilter from '../index';
import { Options } from '../Types/Options';
import ForgeViewer from '../../../../../../components/ForgeViewer/types';
import { Constants } from '../../../constants';
import { hexToRgba } from '../../../../../../utils/hexToRgb';

export class ScheduledModeClassifier extends ModeClassifierInterface {
	private readonly _rotationDay: number;
	private readonly _storedLevel: string;
	constructor(
		element: GetObjectsByLevelType.AcceptanceObject,
		forgeID: number | undefined,
		obj: ReturnType<typeof CurrentElementsFilter.validateData>,
	) {
		super(element, forgeID, obj);
		this._rotationDay = obj.rotationDay;
		this._storedLevel = obj.level;
	}

	public Classify(callback: (revitID: string, forgeID: number | undefined, options: Options) => void): void {
		let options: Options;
		switch (true) {
			case !this.isElementHaveVisibleElementOnForgeViewer():
				options = {
					valid: false,
					addTo: [],
					color: null,
				};
				break;
			case !this.isElementOnActualLevel():
				options = {
					valid: false,
					addTo: [
						ForgeViewer.Payload.ElementOperationTypesEnum.DISABLED,
						ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE,
					],
					color: null,
				};
				break;
			case !this.isElementHaveValidRotationDay():
				options = {
					valid: false,
					addTo: [
						ForgeViewer.Payload.ElementOperationTypesEnum.DISABLED,
						ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE,
					],
					color: null,
				};
				break;

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
	private isElementHaveValidRotationDay() {
		const currentElementRotationDay = this._element.rotation_day;
		return !!currentElementRotationDay?.rotation_day;
	}
	private isElementOnActualLevel() {
		const elementLevel = this._element.level;
		return elementLevel?.id === this._storedLevel;
	}
	private isElementHaveVisibleElementOnForgeViewer() {
		return this._forgeID !== undefined;
	}

	public ExtractColor(key: Constants.WorkProgressElementStatus): ForgeViewer.Payload.Color | undefined {
		const color = Constants.WorkProgressMonolithicColorMap[Constants.MonolithicTabs.SCHEDULED]?.[key];
		if (color) return hexToRgba(color.color, color.alpha, true);
	}
}
