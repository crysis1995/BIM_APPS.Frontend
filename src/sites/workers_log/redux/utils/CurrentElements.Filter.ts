import ForgeViewer from '../../../../components/ForgeViewer/types';
import { RootState } from '../../../../store';
import { LabourInput } from '../labour_input/types';
import dayjs from 'dayjs';
import { GetStatusesType } from '../../../../services/graphql.api.service/CONSTANTS/Queries/GetStatuses';

export type AddToContainersOptions = Omit<
	ForgeViewer.Payload.ElementOperationTypesEnum,
	ForgeViewer.Payload.ElementOperationTypesEnum.COLORED
>;

export interface CurrentElementsFilterData {
	currentElements: number[];
	forgeElements: ForgeViewer.Payload.CurrentElementsFilterData;
}
export enum Mode {
	Default = 'default',
}
export type TabClassifier = { [key in Mode]: ClassifierMethod };

export type ClassifierMethod = (element: LabourInput.Payload.Objects.ObjectWithStatus, forgeID: number) => void;
export interface Options {
	valid: boolean;
	addTo: AddToContainersOptions | AddToContainersOptions[];
	color: ForgeViewer.Payload.Color | null;
}

export default class CurrentElementsFilter {
	private readonly _mode: Mode;
	private readonly _filteredObjects: number[];
	private readonly _allObjects: { [p: string]: LabourInput.Payload.Objects.ObjectWithStatus };
	private readonly _forgeElements: NonNullable<ForgeViewer.Redux.IStore['model_elements']>;
	private readonly _rotationDate: string;
	private readonly _statuses: NonNullable<LabourInput.Redux.General.Store['Statuses']>;
	constructor(obj: ReturnType<typeof CurrentElementsFilter.validateData>) {
		console.time('CurrentElementsFilter'); // test solution performance
		this._mode = obj.mode;
		this._rotationDate = obj.rotationDate;
		this._filteredObjects = obj.FilteredObjects;
		this._allObjects = obj.AllObjects;
		this._forgeElements = obj.forgeElements;
		this._statuses = obj.statusees;
		this.run();
		console.timeEnd('CurrentElementsFilter');
	}

	private readonly _tabClassifier: TabClassifier = {
		[Mode.Default]: this.defaultClassifier,
	};

	static validateData(rootState: RootState) {
		let mode = Mode.Default,
			FilteredObjects: typeof rootState.WorkersLog.LabourInput.Objects.FilteredObjects,
			AllObjects: NonNullable<typeof rootState.WorkersLog.LabourInput.Objects.AllObjects>,
			forgeElements: NonNullable<ForgeViewer.Redux.IStore['model_elements']>,
			rotationDate: string,
			statusees: NonNullable<LabourInput.Redux.General.Store['Statuses']>;

		if (!rootState.WorkersLog.LabourInput.Objects.FilteredObjects) throw new Error('Empty Filtered Objects');
		FilteredObjects = rootState.WorkersLog.LabourInput.Objects.FilteredObjects;
		if (!rootState.WorkersLog.LabourInput.Objects.AllObjects) throw new Error('Empty AllObjects');
		AllObjects = rootState.WorkersLog.LabourInput.Objects.AllObjects;

		if (!rootState.WorkersLog.LabourInput.General.ActualDate) throw new Error('Empty Date');
		rotationDate = rootState.WorkersLog.LabourInput.General.ActualDate;

		if (!rootState.ForgeViewer.model_elements) throw new Error('Empty Forge Elements');
		forgeElements = rootState.ForgeViewer.model_elements;

		if (!rootState.WorkersLog.LabourInput.General.Statuses) throw new Error('Empty Forge Elements');
		statusees = rootState.WorkersLog.LabourInput.General.Statuses;

		return {
			mode,
			FilteredObjects,
			AllObjects,
			forgeElements,
			rotationDate,
			statusees,
		};
	}

	private _currentElements = new Set<number>();
	private _forgeContainer: Required<ForgeViewer.Payload.CurrentElementsFilterData> = {
		[ForgeViewer.Payload.ElementOperationTypesEnum.COLORED]: {},
		[ForgeViewer.Payload.ElementOperationTypesEnum.DISABLED]: [],
		[ForgeViewer.Payload.ElementOperationTypesEnum.HIDDEN]: [],
		[ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE]: [],
		[ForgeViewer.Payload.ElementOperationTypesEnum.SELECTED]: [],
	};

	get filteredData(): CurrentElementsFilterData {
		return {
			currentElements: [...this._currentElements],
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

	private run() {
		for (const revitID in this._allObjects) {
			const element = this._allObjects[revitID];
			const forgeID = this.getForgeId(revitID);

			if (!forgeID) continue;

			if (!this._filteredObjects.includes(parseInt(revitID))) {
				this.OnNonIncludesInActualElements(revitID, forgeID);
			}
			const status = this.extractLatestElementStatus(element.revit_id);
			if (!status) this.OnNonStatus(revitID, forgeID);

			this.handleClassifier(element, forgeID);
		}
	}

	private handleClassifier(element: LabourInput.Payload.Objects.ObjectWithStatus, forgeID: number) {
		this._tabClassifier[this._mode].call(this, element, forgeID);
	}

	private defaultClassifier(element: LabourInput.Payload.Objects.ObjectWithStatus, forgeID: number) {
		const status = this.extractLatestElementStatus(element.revit_id);
		if (status) {
			const extractStatusName = this.extractStatus(status);
			switch (extractStatusName) {
				case GetStatusesType.DBStatuses.Finished:
					this.addElementToOutput(element.revit_id.toString(), forgeID, {
						valid: true,
						addTo: [ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE],
						color: null,
					});
					break;
				case GetStatusesType.DBStatuses.InProgress:
					this.addElementToOutput(element.revit_id.toString(), forgeID, {
						valid: true,
						addTo: [ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE],
						color: null,
					});
					break;
				default:
					break;
			}
		}
	}

	private extractLatestElementStatus(revitID: number) {
		const currentElement = this._allObjects[revitID];
		const globalRotationDate = this._rotationDate;
		if (currentElement && currentElement.statuses.length > 0 && globalRotationDate) {
			const latestStatus = currentElement.statuses.reduce<null | typeof currentElement.statuses[0]>(
				(prev, acc) => {
					if (prev) {
						if (dayjs(prev.date).isBefore(dayjs(acc.date))) {
							prev = acc;
						}
					} else {
						if (dayjs(acc.date).isSameOrBefore(dayjs(globalRotationDate))) {
							prev = acc;
						}
					}
					return prev;
				},
				null,
			);
			if (latestStatus) return latestStatus;
		}
	}

	private OnNonStatus(revitID: string, forgeID: number) {
		this.addElementToOutput(revitID, forgeID, {
			valid: false,
			addTo: [
				ForgeViewer.Payload.ElementOperationTypesEnum.DISABLED,
				ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE,
			],
			color: null,
		});
	}
	private OnNonIncludesInActualElements(revitID: string, forgeID: number) {
		this.addElementToOutput(revitID, forgeID, {
			valid: false,
			addTo: [
				ForgeViewer.Payload.ElementOperationTypesEnum.DISABLED,
				ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE,
			],
			color: null,
		});
	}

	private addElementToOutput(revitID: string, forgeID: number, options: Options) {
		if (options.valid) this._currentElements.add(parseInt(revitID));
		this.addToForgeVisibleContainers(options, forgeID);
		this.addToForgeColorizeContainer(options, forgeID);
	}
	private addToForgeColorizeContainer(options: Options, forgeID: number) {
		if (options.color) {
			this._forgeContainer[ForgeViewer.Payload.ElementOperationTypesEnum.COLORED][forgeID] = {
				element: forgeID,
				color: options.color,
			};
		}
	}
	private addToForgeVisibleContainers(options: Options, forgeID: number) {
		if (Array.isArray(options.addTo)) {
			options.addTo.forEach((key) => {
				const data = key as ForgeViewer.Payload.ElementOperationTypesEnum;
				if (data !== ForgeViewer.Payload.ElementOperationTypesEnum.COLORED)
					this._forgeContainer[data].push(forgeID);
			});
		} else {
			const key = options.addTo as ForgeViewer.Payload.ElementOperationTypesEnum;
			if (key !== ForgeViewer.Payload.ElementOperationTypesEnum.COLORED) this._forgeContainer[key].push(forgeID);
		}
	}

	private getForgeId(revitID: string) {
		if (this._forgeElements.hasOwnProperty(revitID)) return this._forgeElements[revitID].forgeId;
	}
	// private static extractColor(key: MonolithicStatuses): ForgeViewer.Payload.Color | null {
	// 	return hexToRgba(MonolithicViewerLegend[key].color, MonolithicViewerLegend[key].alpha, true);
	// }

	private extractStatus(status: LabourInput.Payload.Objects.Status) {
		const extractedStatus = this._statuses[status.status];
		return extractedStatus.name;
	}
}
