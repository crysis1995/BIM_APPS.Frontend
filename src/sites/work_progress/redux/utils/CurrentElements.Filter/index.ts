import { RootState } from '../../../../../store';
import { Constants } from '../../constants';
import ForgeViewer from '../../../../../components/ForgeViewer/types';
import WorkProgress from '../../../types';
import { GetObjectsByLevelType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';
import { Options } from './Types/Options';
import { ScheduledModeClassifier } from './Classifiers/Scheduled.Mode.Classifier';
import { ActualModeClassifier } from './Classifiers/Actual.Mode.Classifier';
import { TabClassifier } from './Types/TabClassifier.Interface';
import { CurrentElementsFilterData } from './Types/CurrentElementsFilterData.Interface';
import { HistoricModeClassifier } from './Classifiers/Historic.Mode.Classifier';

export default class CurrentElementsFilter {
	// private _state: RootState;
	private readonly _mode: Constants.MonolithicTabs;
	private readonly _objects: WorkProgress.Monolithic.Upgrading.StoreStructure.ByRevitId;
	private readonly _forgeElements: NonNullable<ForgeViewer.Redux.IStore['model_elements']>;
	private readonly _level: string;
	private readonly _rotationDate: string;
	private readonly _rotationDay: number;
	private readonly _statuses: NonNullable<WorkProgress.Monolithic.General.Redux.IStore['statuses']>;

	constructor(obj: ReturnType<typeof CurrentElementsFilter.validateData>) {
		this._mode = obj.mode;
		this._objects = obj.objects;
		this._forgeElements = obj.forgeElements;
		this._level = obj.level;
		this._rotationDate = obj.rotationDate;
		this._rotationDay = obj.rotationDay;
		this._statuses = obj.statuses;

		this.run();
	}

	/*
	 * 		Getter used with outside classifier class
	 * */
	get classifierData(): ReturnType<typeof CurrentElementsFilter.validateData> {
		return {
			forgeElements: this._forgeElements,
			level: this._level,
			mode: this._mode,
			objects: this._objects,
			rotationDate: this._rotationDate,
			rotationDay: this._rotationDay,
			statuses: this._statuses,
		};
	}

	private readonly _tabClassifier: TabClassifier = {
		[Constants.MonolithicTabs.SCHEDULED]: ScheduledModeClassifier,
		[Constants.MonolithicTabs.CURRENT]: ActualModeClassifier,
		[Constants.MonolithicTabs.HISTORICAL]: HistoricModeClassifier,
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
		let mode: Constants.MonolithicTabs,
			objects: WorkProgress.Monolithic.Upgrading.StoreStructure.ByRevitId,
			forgeElements: ForgeViewer.Redux.IStore['model_elements'],
			level: string,
			rotationDate: string,
			rotationDay: number,
			statuses: NonNullable<WorkProgress.Monolithic.General.Redux.IStore['statuses']>;

		if (!rootState.WorkProgress.Monolithic.General.statuses) throw new Error('Empty Statuses');
		statuses = rootState.WorkProgress.Monolithic.General.statuses;

		if (!rootState.WorkProgress.Monolithic.General.active_level) throw new Error('Empty Level');
		level = rootState.WorkProgress.Monolithic.General.active_level;

		if (!rootState.WorkProgress.Monolithic.General.active_tab) throw new Error('Empty Active Tab');
		mode = rootState.WorkProgress.Monolithic.General.active_tab;

		if (rootState.WorkProgress.Monolithic.General.rotation_day === null) throw new Error('Empty Rotation Day');
		rotationDay = rootState.WorkProgress.Monolithic.General.rotation_day;

		if (!rootState.WorkProgress.Monolithic.General.date) throw new Error('Empty Date');
		rotationDate = rootState.WorkProgress.Monolithic.General.date;

		if (!rootState.WorkProgress.Monolithic.Upgrading.byRevitId || !rootState.ForgeViewer.model_elements)
			throw new Error('Empty Objects');
		objects = rootState.WorkProgress.Monolithic.Upgrading.byRevitId;

		forgeElements = rootState.ForgeViewer.model_elements;

		return {
			mode,
			objects,
			forgeElements,
			level,
			rotationDate,
			rotationDay,
			statuses,
		};
	}

	/*
	 * 		Classifier runner method.
	 * 		Iterate over collection of element and filter element
	 * 		to corresponding container
	 *
	 * */
	private run() {
		for (const revitID in this._objects) {
			const element = this._objects[revitID];
			const forgeID = this.extractForgeId(revitID);

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
	private handleTabClassifier(element: GetObjectsByLevelType.AcceptanceObject, forgeID: number | undefined) {
		const classifier = this._tabClassifier[this._mode];
		if (classifier) {
			new classifier(element, forgeID, this.classifierData).Classify((revitID, forgeID1, options) =>
				this.addElementToOutput(revitID, forgeID1, options),
			);
		}
	}
}
