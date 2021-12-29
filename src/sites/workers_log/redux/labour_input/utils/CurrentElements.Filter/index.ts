import { Options } from './Types/Options';
import { TabClassifier } from './Types/TabClassifier.Interface';
import { CurrentElementsFilterData } from './Types/CurrentElementsFilterData.Interface';
import WorkersLog from '../../../../types';
import ForgeViewer from '../../../../../../components/ForgeViewer/types';

import { Constants } from '../../../../../work_progress/redux/constants';
import { LabourInputClassifier } from './Classifiers/LabourInput.Classifier';
import { RootState } from '../../../../../../state';

export default class CurrentElementsFilter {
	// private _state: RootState;
	private readonly _objects: NonNullable<WorkersLog.LabourInput.Redux.Objects.Store['AllObjects']>;
	private readonly _forgeElements: NonNullable<ForgeViewer.Redux.IStore['model_elements']>;
	private readonly _level: string;
	private readonly _rotationDate: string;

	private _mode = 'default' as const;
	constructor(obj: ReturnType<typeof CurrentElementsFilter.validateData>) {
		this._objects = obj.objects;
		this._forgeElements = obj.forgeElements;
		this._level = obj.level;
		this._rotationDate = obj.rotationDate;

		this.run();
	}

	/*
	 * 		Getter used with outside classifier class
	 * */
	get classifierData(): ReturnType<typeof CurrentElementsFilter.validateData> {
		return {
			forgeElements: this._forgeElements,
			level: this._level,
			objects: this._objects,
			rotationDate: this._rotationDate,
		};
	}

	private readonly _tabClassifier: TabClassifier = {
		default: LabourInputClassifier,
	};
	private _currentElements = new Set<number>();
	private _currentElementsCombinedWithStatus: { [key: string]: Constants.WorkProgressElementStatus } = {};
	protected _forgeContainer: Required<ForgeViewer.Payload.CurrentElementsFilterData> = {
		[ForgeViewer.Payload.ElementOperationTypesEnum.COLORED]: {},
		[ForgeViewer.Payload.ElementOperationTypesEnum.DISABLED]: [],
		[ForgeViewer.Payload.ElementOperationTypesEnum.HIDDEN]: [],
		[ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE]: [],
		[ForgeViewer.Payload.ElementOperationTypesEnum.SELECTED]: [],
	};

	/*
	 * 		Getter filtered objects data
	 *
	 * */
	get filteredData(): CurrentElementsFilterData {
		return {
			currentElements: [...this._currentElements],
			currentElementsWithStatuses: {
				...this._currentElementsCombinedWithStatus,
			},
			forgeElements: {
				[ForgeViewer.Payload.ElementOperationTypesEnum.COLORED]: this._forgeContainer[
					ForgeViewer.Payload.ElementOperationTypesEnum.COLORED
				],
				[ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE]: [
					...this._forgeContainer[ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE],
				],
				[ForgeViewer.Payload.ElementOperationTypesEnum.DISABLED]: [
					...this._forgeContainer[ForgeViewer.Payload.ElementOperationTypesEnum.DISABLED],
				],
				[ForgeViewer.Payload.ElementOperationTypesEnum.HIDDEN]: [
					...this._forgeContainer[ForgeViewer.Payload.ElementOperationTypesEnum.HIDDEN],
				],
				[ForgeViewer.Payload.ElementOperationTypesEnum.SELECTED]: [
					...this._forgeContainer[ForgeViewer.Payload.ElementOperationTypesEnum.SELECTED],
				],
			},
		};
	}
	/*
	 * 		Data validation
	 * 		Check if every needed values is provided
	 * */
	public static validateData(rootState: RootState) {
		let objects: NonNullable<WorkersLog.LabourInput.Redux.Objects.Store['AllObjects']>,
			forgeElements: ForgeViewer.Redux.IStore['model_elements'],
			level: string,
			rotationDate: string;

		if (!rootState.WorkersLog.LabourInput.General.ActiveLevel) throw new Error('Empty Level');
		level = rootState.WorkersLog.LabourInput.General.ActiveLevel.id;

		if (!rootState.WorkersLog.LabourInput.General.ActualDate) throw new Error('Empty Date');
		rotationDate = rootState.WorkersLog.LabourInput.General.ActualDate;

		if (!rootState.WorkersLog.LabourInput.Objects.AllObjects || !rootState.ForgeViewer.model_elements)
			throw new Error('Empty Objects');
		objects = rootState.WorkersLog.LabourInput.Objects.AllObjects;

		forgeElements = rootState.ForgeViewer.model_elements;

		return {
			objects,
			forgeElements,
			level,
			rotationDate,
		};
	}

	/*
	 * 		Classifier runner method.
	 * 		Iterate over collection of element and filter element
	 * 		to corresponding container
	 *
	 * */
	private run() {
		for (const id in this._objects) {
			const element = this._objects[id];
			const forgeID = this.extractForgeId(element.revit_id.toString());

			this.handleTabClassifier(element, forgeID);
		}
	}

	/*
	 * 	Generic method to add element according to option
	 *
	 * */
	private addElementToOutput(revitID: string, forgeID: number | undefined, options: Options) {
		if (options.valid) {
			this._currentElements.add(parseInt(revitID));
			if (options.status) {
				this._currentElementsCombinedWithStatus[revitID] = options.status;
			}
		}
		this.addToForgeVisibleContainers(options, forgeID);
		this.addToForgeColorizeContainer(options, forgeID);
	}
	/*
	 *		Method to add element to colorize container
	 * */
	private addToForgeColorizeContainer(options: Options, forgeID: number | undefined) {
		if (options.color && forgeID) {
			this._forgeContainer[ForgeViewer.Payload.ElementOperationTypesEnum.COLORED][forgeID] = {
				element: forgeID,
				color: options.color,
			};
		}
	}
	/*
	 *		Method to add element to array like forge container
	 * */
	private addToForgeVisibleContainers(options: Options, forgeID: number | undefined) {
		if (forgeID) {
			if (Array.isArray(options.addTo)) {
				options.addTo.forEach((key) => {
					const data = key as ForgeViewer.Payload.ElementOperationTypesEnum;
					if (data !== ForgeViewer.Payload.ElementOperationTypesEnum.COLORED)
						this._forgeContainer[data].push(forgeID);
				});
			} else {
				const key = options.addTo as ForgeViewer.Payload.ElementOperationTypesEnum;
				if (key !== ForgeViewer.Payload.ElementOperationTypesEnum.COLORED)
					this._forgeContainer[key].push(forgeID);
			}
		}
	}

	/*
	 *		ForgeID extractor
	 * */
	private extractForgeId(revitID: string) {
		if (this._forgeElements.hasOwnProperty(revitID)) return this._forgeElements[revitID].forgeId;
	}

	/*
	 *		Classifier based on actual choose tab
	 * */
	private handleTabClassifier(
		element: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus,
		forgeID: number | undefined,
	) {
		const classifier = this._tabClassifier[this._mode];
		if (classifier) {
			new classifier(element, forgeID, this.classifierData).Classify((revitID, forgeID1, options) =>
				this.addElementToOutput(revitID, forgeID1, options),
			);
		}
	}
}
