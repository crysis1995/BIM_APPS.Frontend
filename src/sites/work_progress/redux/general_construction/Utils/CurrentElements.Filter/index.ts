import { Options } from './Types/Options';
import { TabClassifier } from './Types/TabClassifier.Interface';
import { CurrentElementsFilterData } from './Types/CurrentElementsFilterData.Interface';
import WorkProgress from '../../../../types';
import ForgeViewer from '../../../../../../components/ForgeViewer/types';

import { Constants } from '../../../../../work_progress/redux/constants';
import { GeneralConstructionClassifier } from './Classifiers/LabourInput.Classifier';
import { ElementType } from './Types/ElementType';
import { DefaultOptions } from './Types/OptionsType';
import { RootState } from '../../../../../../state';

export default class CurrentElementsFilter {
	private readonly _objects: NonNullable<
		WorkProgress.GeneralConstruction.Objects.Redux.IStore['ObjectsByID']
	>;
	private readonly _forgeElements: NonNullable<ForgeViewer.Redux.IStore['model_elements']>;
	private readonly _statusesByRevitID: NonNullable<
		WorkProgress.GeneralConstruction.Objects.Redux.IStore['ObjectStatusAll']
	>;

	private _mode = 'default' as const;
	constructor(
		obj: ReturnType<typeof CurrentElementsFilter.validateData>,
		options = DefaultOptions,
	) {
		this._objects = obj.objects;
		this._forgeElements = obj.forgeElements;
		this._statusesByRevitID = obj.statusesByRevitID;
		this.run();
	}

	/*
	 * 		Getter used with outside classifier class
	 * */
	get classifierData(): ReturnType<typeof CurrentElementsFilter.validateData> {
		return {
			forgeElements: this._forgeElements,
			objects: this._objects,
			statusesByRevitID: this._statusesByRevitID,
		};
	}

	private readonly _tabClassifier: TabClassifier = {
		default: GeneralConstructionClassifier,
	};
	private _currentElements = new Set<number>();
	private _currentElementsCombinedWithStatus: {
		[key: string]: Constants.WorkProgressElementStatus;
	} = {};
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
				[ForgeViewer.Payload.ElementOperationTypesEnum.COLORED]:
					this._forgeContainer[ForgeViewer.Payload.ElementOperationTypesEnum.COLORED],
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
		let objects: NonNullable<
				WorkProgress.GeneralConstruction.Objects.Redux.IStore['ObjectsByID']
			>,
			forgeElements: ForgeViewer.Redux.IStore['model_elements'],
			statusesByRevitID: NonNullable<
				WorkProgress.GeneralConstruction.Objects.Redux.IStore['ObjectStatusAll']
			>;

		if (
			!rootState.WorkProgress.GeneralConstruction.Objects.ObjectsByID ||
			!rootState.ForgeViewer.model_elements
		)
			throw new Error('Empty Objects');
		objects = rootState.WorkProgress.GeneralConstruction.Objects.ObjectsByID;
		forgeElements = rootState.ForgeViewer.model_elements;

		if (!rootState.WorkProgress.GeneralConstruction.Objects.ObjectStatusAll)
			throw new Error('Empty Statuses');

		statusesByRevitID = rootState.WorkProgress.GeneralConstruction.Objects.ObjectStatusAll;

		return {
			objects,
			forgeElements,
			statusesByRevitID,
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
		if (this._forgeElements.hasOwnProperty(revitID))
			return this._forgeElements[revitID].forgeId;
	}

	/*
	 *		Classifier based on actual choose tab
	 * */
	private handleTabClassifier(element: ElementType, forgeID: number | undefined) {
		const classifier = this._tabClassifier[this._mode];
		if (classifier) {
			new classifier(element, forgeID, this.classifierData).Classify(
				(revitID, forgeID1, options) => this.addElementToOutput(revitID, forgeID1, options),
			);
		}
	}
}
