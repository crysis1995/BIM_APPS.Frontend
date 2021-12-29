import React, { Component } from 'react';

import ForgeViewerActions from '../redux/actions';
import ForgeViewer from '../types';
import WorkProgressMonolithicUpgradingActions from '../../../sites/work_progress/redux/monolithic/upgrading/actions';
import { connect } from 'react-redux';
import LabourInputObjectsActions from '../../../sites/workers_log/redux/labour_input/objects/actions';
import isChanged from '../../../utils/IsEqual';
import { EApplications, EApplicationsWithModules } from '../../../sites/types';
import { Apps, ModuleUtils, Options } from './types';
import { modelSelector } from './modelSelector';
import PrefabricatedObjectsActions from '../../../sites/work_progress/redux/prefabricated/objects/actions';
// import GeneralConstructionObjectActions from '../../../sites/work_progress/redux/general_construction/objects/actions';
import { RootState } from '../../../state';
import { ModelSelector } from '../redux/selector';
import { WorkProgress } from '../../../state/WorkProgress';

/*
 * 		constants
 *
 * */

/*
 * 		TODO PRZEROBIĆ NA COŚ LŻEJSZEGO, NA ZASADZIE FABRYKI?
 *
 * */

const elementParameterLevelName = 'VCF_Etage';
const warbudElementParameterLevelName = 'WB_Scheduled_Level';

const defaultOptions: Options = {
	startupHideAll: true,
	strictVisibility: false,
	setContextNull: false,
	isLevelNecessary: false,
};

type ComponentProps = {
	runBy: Apps;
};

const mapStateToProps = (state: RootState) => ({
	login_3_legged: state.Autodesk.login_3_legged,
	models: ModelSelector(state),
	defaultViewName: state.CMSLogin.actual_project?.defaultViewName,
	model_elementsByForgeID: state.ForgeViewer.model_elementsByForgeID,
	current_sheet: modelSelector(state),
	model_elements_loading: state.ForgeViewer.model_elements_loading,
	visible_elements: state.ForgeViewer.visible_elements,
	hidden_elements: state.ForgeViewer.hidden_elements,
	disabled_elements: state.ForgeViewer.disabled_elements,
	selected_elements: state.ForgeViewer.selected_elements,
	colored_elements: state.ForgeViewer.colored_elements,
});


const mapDispatchToProps = {
	SetSheetsSuccess: ForgeViewerActions.SetSheetsSuccess,
	SetCurrentSheet: ForgeViewerActions.SetCurrentSheet,
	StartViewer: ForgeViewerActions.StartViewer,
	EndViewer: ForgeViewerActions.EndViewer,
	SetViewerElements: ForgeViewerActions.SetViewerElements,
	SetElements: ForgeViewerActions.SetElements,
	CleanElements: ForgeViewerActions.CleanElements,
	handleSelectedElements: WorkProgressMonolithicUpgradingActions.HandleSelectElements,
	LabourInputHandleSelectObject: LabourInputObjectsActions.HandleSelectObject,
	HandleSelectElements: PrefabricatedObjectsActions.HandleSelectElements,
	GeneralConstructionHandleSelectElements: WorkProgress.Actions.Elements.HandleSelectElements,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;
type State = { currentApp: Apps };

enum ModelType {
	RVT = 'rvt',
	NWD = 'nwd',
	NWC = 'nwc',
}

class Viewer extends Component<Props, State> {
	private doc: Autodesk.Viewing.Document | null;
	private viewer: Autodesk.Viewing.GuiViewer3D | null;

	private modelType: ModelType | null = null;

	get currentAppUtils() {
		return this[this.state.currentApp];
	}

	constructor(props: Props) {
		super(props);
		this.viewer = null;
		this.doc = null;
		this.state = {
			currentApp: this.props.runBy,
		};
	}

	/*
	 * 		module settings
	 * */

	[EApplications.MODEL_VIEWER]: ModuleUtils = {
		methods: {},
		options: {
			...defaultOptions,
			startupHideAll: false,
		},
	};
	[EApplicationsWithModules.WORKERS_LOG_LABOUR_INPUT]: ModuleUtils = {
		methods: { OnSelect: this.props.LabourInputHandleSelectObject },
		options: {
			...defaultOptions,
			strictVisibility: true,
			isLevelNecessary: true,
		},
	};

	[EApplicationsWithModules.WORK_PROGRESS_MONOLITHIC]: ModuleUtils = {
		methods: {
			OnSelect: this.props.handleSelectedElements,
		},
		options: {
			...defaultOptions,
			setContextNull: true,
			isLevelNecessary: true,
		},
	};
	[EApplicationsWithModules.WORK_PROGRESS_PREFABRICATED]: ModuleUtils = {
		methods: {
			OnSelect: this.props.HandleSelectElements,
		},
		options: {
			...defaultOptions,
			startupHideAll: false,
		},
	};

	[EApplicationsWithModules.CONSTRUCTION_MATERIALS_REINFORCEMENT]: ModuleUtils = {
		methods: {},
		options: {
			...defaultOptions,
			startupHideAll: false,
		},
	};

	[EApplicationsWithModules.WORK_PROGRESS_GENERAL_CONSTRUCTION]: ModuleUtils = {
		methods: {
			OnSelect: this.props.GeneralConstructionHandleSelectElements,
		},
		options: {
			...defaultOptions,
			startupHideAll: false,
		},
	};

	componentDidMount() {
		this.launchViewer(this.props.models?.[0].modelUrn);
	}
	componentWillUnmount() {
		this.props.EndViewer();
	}
	componentDidUpdate(prevProps: Props, prevState: Readonly<State>) {
		this.OnProjectChange(prevProps, this.props);
		this.OnCurrentSheetChange(prevProps, this.props);
		this.OnDefaultActive(prevProps, this.props);
	}
	private OnProjectChange(previousProps: Props, actualProps: Props) {
		if (actualProps.models?.[0].modelUrn !== previousProps.models?.[0].modelUrn) {
			this.launchViewer(this.props.models?.[0].modelUrn);
		}
	}
	private OnCurrentSheetChange(
		prevProps: Props,
		actualProps: Readonly<Props> & Readonly<{ children?: React.ReactNode }>,
	) {
		if (prevProps.current_sheet !== actualProps.current_sheet) {
			this.loadSheet();
		}
	}

	private OnDefaultActive(
		prevProps: Props,
		props: Readonly<Props> & Readonly<{ children?: React.ReactNode }>,
	) {
		if (this.currentAppUtils.options.setContextNull && this.viewer)
			this.viewer.setContextMenu(null);
		if (this.props.current_sheet && !this.props.model_elements_loading) {
			if (
				isChanged(prevProps.visible_elements, props.visible_elements) ||
				isChanged(prevProps.hidden_elements, props.hidden_elements)
			)
				this.handleVisibility(
					prevProps.visible_elements,
					props.visible_elements,
					prevProps.hidden_elements,
					props.hidden_elements,
				);

			if (isChanged(prevProps.disabled_elements, props.disabled_elements))
				this.handleLock(prevProps.disabled_elements, props.disabled_elements);

			if (isChanged(prevProps.selected_elements, props.selected_elements))
				this.handleSelect(props.selected_elements);

			if (isChanged(prevProps.colored_elements, this.props.colored_elements))
				this.handleColorize(Object.values(props.colored_elements));
		}
	}

	loadSheet() {
		if (this.viewer && this.doc && this.props.current_sheet)
			this.viewer.loadDocumentNode(
				this.doc,
				this.doc.getRoot().findByGuid(this.props.current_sheet),
			);
	}

	IterateOverChildren(
		children: Autodesk.Viewing.BubbleNode[],
		Guids: { id: string; name: string }[],
	) {
		children.forEach((child) => {
			if (child.is3D()) Guids.push({ id: child.guid(), name: child.name() });
			if (child.children && child.children.length > 0)
				this.IterateOverChildren(child.children, Guids);
		});
	}

	launchViewer(urn: string | undefined) {
		const options: Autodesk.Viewing.InitializerOptions = {
			env: 'AutodeskProduction',
			getAccessToken: (callback) =>
				this.props.login_3_legged &&
				callback &&
				callback(
					this.props.login_3_legged.access_token,
					this.props.login_3_legged.expires_in,
				),
		};

		Autodesk.Viewing.Initializer(options, async () => {
			const onDocumentLoadSuccess = (doc: Autodesk.Viewing.Document) => {
				this.doc = doc;
				const viewables = doc
					.getRoot()
					.search({ type: 'geometry' })
					.filter((e) => {
						return e.is2D();
					});
				const elements = viewables.map((e) => {
					return { id: e.guid(), name: e.name() };
				});

				const root = doc.getRoot();
				const Guids: { id: string; name: string }[] = [];
				this.IterateOverChildren(root.children, Guids);

				const viewName = this.props.defaultViewName;
				function Get3DModel(): { id: string; name: string } | undefined {
					if (Guids.length === 0) return;
					let wsproModel = Guids.find((e) => e.name.toLowerCase().includes('wspro'));
					if (wsproModel) return wsproModel;
					if (viewName) {
						let defaultNameModel = Guids.find((e) => e.name === viewName);
						if (defaultNameModel) return defaultNameModel;
					}
					return Guids.find((e) => e.name.toLowerCase().includes('3d'));
				}

				let view3D = Get3DModel();
				this.props.SetSheetsSuccess(elements, view3D);
				this.props.StartViewer();
			};

			const onDocumentLoadFailure = (viewerErrorCode: Autodesk.Viewing.ErrorCodes) => {
				console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
			};

			const documentConteiner = document.getElementById('forgeViewer');
			if (documentConteiner) {
				const { Switch2D3DViewExtension } = await import(
					'./extenstions/2D3DSwitchExtension'
				);
				Switch2D3DViewExtension.register();
				this.viewer = new Autodesk.Viewing.GuiViewer3D(documentConteiner, {
					extensions: [
						'Autodesk.DocumentBrowser',
						'Autodesk.Edit2D',
						'Switch2D3DViewExtension',
						// 'Autodesk.Measure',
						// "ShowRoomsExtension",
						// "Autodesk.AEC.LevelsExtension"
						'Viewing.Extension.ReactPanel',
					],
				});

				this.viewer.start();
				var documentId = 'urn:' + urn;
				Autodesk.Viewing.Document.load(
					documentId,
					onDocumentLoadSuccess,
					onDocumentLoadFailure,
				);
				this.viewer.addEventListener(
					Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT,
					this.OnObjectTreeCreatedEvent.bind(this),
				);
				this.viewer.addEventListener(
					Autodesk.Viewing.SELECTION_CHANGED_EVENT,
					this.OnSelectionChangedEvent.bind(this),
				);
			}
		});
	}

	private OnSelectionChangedEvent(data: {
		fragIdsArray: number[];
		dbIdArray: number[];
		nodeArray: number[];
		model: Autodesk.Viewing.Model;
	}) {
		const defFunc = (data: number[]) => {};
		this.OnSelectionChange(data, this[this.state.currentApp].methods.OnSelect || defFunc);
	}

	private OnSelectionChange(
		data: {
			fragIdsArray: number[];
			dbIdArray: number[];
			nodeArray: number[];
			model: Autodesk.Viewing.Model;
		},
		reduxCallback: (data: number[]) => void,
	) {
		if (this.viewer && isChanged(data.dbIdArray, this.props.selected_elements)) {
			this.props.SetElements({ selected: data.dbIdArray });
			if (data.dbIdArray.length > 0) {
				if (this.modelType === ModelType.RVT) {
					let revitIDS = data.dbIdArray
						.map((db) => this.props.model_elementsByForgeID?.[db])
						.filter((x) => !!x) as number[];
					reduxCallback(revitIDS);
				} else if (this.modelType === ModelType.NWC || this.modelType === ModelType.NWD) {
					let revitIDS = data.dbIdArray
						.map((item) => {
							const id = this.viewer?.model.getInstanceTree().getNodeParentId(item);
							return id && this.props.model_elementsByForgeID?.[id];
						})
						.filter((x) => !!x) as number[];
					reduxCallback(revitIDS);
				}
			} else {
				reduxCallback([]);
			}
		}
	}
	private async GetElementSchemaName(rootId: number, viewer: Autodesk.Viewing.GuiViewer3D) {
		return new Promise<Autodesk.Viewing.PropertyResult>((resolve, reject) => {
			viewer.model.getBulkProperties(
				[rootId],
				{ propFilter: ['schema_name'] },
				(data) => resolve(data[0]),
				(err) => reject(err),
			);
		});
	}

	private async SetModelType(viewer: Autodesk.Viewing.GuiViewer3D) {
		const tree = viewer.model.getInstanceTree();
		const rootId = tree.getRootId();
		let rootElement = await this.GetElementSchemaName(rootId, viewer);
		if (!rootElement) return;
		const schemaName = rootElement.properties.find(
			(prop) => prop.displayName === 'schema_name',
		)?.displayValue;
		this.modelType = schemaName ? (schemaName as ModelType) : null;
	}

	private async OnObjectTreeCreatedEvent() {
		const GetElementsFromNavisworksModel = (
			tree: Autodesk.Viewing.InstanceTree,
			rootId: number,
			viewer: Autodesk.Viewing.GuiViewer3D,
		) => {
			let elements = new Set<number>();
			tree.enumNodeChildren(
				rootId,
				(dbID) => {
					elements.add(dbID);
				},
				true,
			);
			viewer.model.getBulkProperties(
				[...elements],
				{
					propFilter: [
						'Value',
						elementParameterLevelName,
						warbudElementParameterLevelName,
						'Level',
					],
				},
				(result) => {
					const extractedData = result
						.map((data) => {
							let output: Partial<ForgeViewer.Payload.Element> | undefined = {
								forgeId: data.dbId,
							};
							if (this.currentAppUtils.options.isLevelNecessary) {
								const level = data.properties.find(
									(x) =>
										!!x.displayValue &&
										[
											elementParameterLevelName,
											warbudElementParameterLevelName,
											'Level',
										].includes(x.attributeName) &&
										typeof x.displayValue === 'string',
								);
								if (level) output.levelName = level.displayValue;
							}
							const propertyValue = data.properties.find(
								(prop) => prop.displayName === 'Value',
							);
							if (propertyValue) {
								output.rvtId = parseInt(propertyValue.displayValue);
							}
							if (output) return output;
						})
						.filter((x) => !!x) as ForgeViewer.Payload.Element[];
					this.props.SetViewerElements(extractedData);
				},
			);
		};

		const GetElementsFromRevitModel = (
			tree: Autodesk.Viewing.InstanceTree,
			rootId: number,
			viewer: Autodesk.Viewing.GuiViewer3D,
		) => {
			let elements = new Set<number>();
			tree.enumNodeChildren(
				rootId,
				(dbID) => {
					if (tree.getChildCount(dbID) === 0) {
						elements.add(dbID);
					}
				},
				true,
			);
			viewer.model.getBulkProperties(
				[...elements],
				{
					propFilter: [
						'name',
						elementParameterLevelName,
						warbudElementParameterLevelName,
						'Level',
						'Value',
					],
				},
				(result) => {
					const extractedData = result
						.map((data) => {
							if (data.name) {
								let output: Partial<ForgeViewer.Payload.Element> | undefined;
								let revit_id = /.+\[(.+)\]/g.exec(data.name);
								if (revit_id && revit_id[1]) {
									output = {
										forgeId: data.dbId,
										rvtId: revit_id[1],
									};
									if (this.currentAppUtils.options.isLevelNecessary) {
										const level = data.properties.find(
											(x) =>
												!!x.displayValue &&
												[
													elementParameterLevelName,
													warbudElementParameterLevelName,
													'Level',
												].includes(x.attributeName) &&
												typeof x.displayValue === 'string',
										);
										if (level) output.levelName = level.displayValue;
									}
								}
								return output;
							}
						})
						.filter((x) => !!x) as ForgeViewer.Payload.Element[];
					this.props.SetViewerElements(extractedData);
				},
			);
		};

		if (this.viewer) {
			try {
				const tree = this.viewer.model.getInstanceTree();
				const rootId = tree.getRootId();
				await this.SetModelType(this.viewer);
				if (this.modelType === ModelType.RVT)
					GetElementsFromRevitModel(tree, rootId, this.viewer);
				if (this.modelType === ModelType.NWD || this.modelType === ModelType.NWC)
					GetElementsFromNavisworksModel(tree, rootId, this.viewer);

				this.currentAppUtils.options.startupHideAll && this.viewer.hide(rootId);
			} catch (e) {
				console.error((e as Error).message || e);
			}
		}
	}
	handleSelect(actual_selected_elements: ForgeViewer.Payload.ForgeElement[]) {
		if (this.viewer) {
			this.viewer.select(actual_selected_elements);
		}
	}

	handleColorize(this_colored_elements: ForgeViewer.Payload.ColoredElement[]) {
		if (this.viewer) {
			// @ts-ignore
			this.viewer.clearThemingColors();
			if (this_colored_elements.length > 0) {
				// if (this.modelType === ModelType.NWC || this.modelType === ModelType.NWD) {
				// this_colored_elements = [
				// 	...this_colored_elements.map((elem) => {
				// 		elem.element = this.viewer!.model.getInstanceTree().getNodeParentId(elem.element);
				// 		return elem;
				// 	}),
				// ];
				// }
				for (const { color, element } of this_colored_elements) {
					let id =
						this.modelType === ModelType.NWC || this.modelType === ModelType.NWD
							? this.viewer!.model.getInstanceTree().getNodeParentId(element)
							: element;
					this.viewer.setThemingColor(
						id,
						new THREE.Vector4(color.r, color.g, color.b, color.a || 1),
						this.viewer.model,
						true,
					);
				}
			}
			this.viewer.refresh(false);
		}
	}

	handleLock(
		prevElement: ForgeViewer.Payload.ForgeElement[],
		this_disabled_elements: ForgeViewer.Payload.ForgeElement[],
	) {
		if (this.viewer) {
			if (this_disabled_elements.length > 0) {
				// @ts-ignore
				this.viewer.lockSelection(this_disabled_elements, true);
				if (prevElement.length > 0) {
					// @ts-ignore
					this.viewer.unlockSelection(
						prevElement.filter((e) => !this_disabled_elements.includes(e)),
					);
				}
			} else {
				// @ts-ignore
				prevElement.length > 0 && this.viewer.unlockSelection(prevElement);
			}
		}
	}

	handleVisibility(
		perv_actual_visible_elements: ForgeViewer.Payload.ForgeElement[],
		actual_visible_elements: ForgeViewer.Payload.ForgeElement[],
		prev_actual_hidden_elements: ForgeViewer.Payload.ForgeElement[],
		actual_hidden_elements: ForgeViewer.Payload.ForgeElement[],
	) {
		if (this.viewer) {
			if (this.currentAppUtils.options.strictVisibility) {
				this.viewer.hide(perv_actual_visible_elements);
				this.viewer.hide(prev_actual_hidden_elements);
			}
			this.viewer.hide(actual_hidden_elements);
			this.viewer.show(actual_visible_elements);
		}
	}

	render() {
		return <div id="forgeViewer" />;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
