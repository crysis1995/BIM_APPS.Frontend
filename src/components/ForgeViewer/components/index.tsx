import React, { Component } from 'react';
import { RootState } from '../../../store';
import ForgeViewerActions from '../redux/actions';
import ForgeViewer from '../types';
import WorkProgressMonolithicUpgradingActions from '../../../sites/work_progress/redux/monolithic/upgrading/actions';
import { connect } from 'react-redux';
import LabourInputObjectsActions from '../../../sites/workers_log/redux/labour_input/objects/actions';

/*
 * 		constants
 *
 * */

const elementParameterLevelName = 'VCF_Etage';
const warbudElementParameterLevelName = 'WB_Scheduled_Level';

type Options = {
	strictVisibility: boolean;
};

enum ApplicationType {
	WorkProgress_Monolithic = 'WorkProgress_Monolithic',
	WorkersLog_LabourInput = 'WorkersLog_LabourInput',
	Default = 'Default',
}

const mapStateToProps = (state: RootState) => ({
	login_3_legged: state.Autodesk.login_3_legged,
	project_urn: state.CMSLogin.actual_project?.urn,
	current_sheet:
		state.ForgeViewer.is3DMode && state.ForgeViewer.view3D
			? state.ForgeViewer.view3D.id
			: state.ForgeViewer.current_sheet,
	isWorkProgressMonolithicActive: state.WorkProgress.Monolithic.General.active,
	model_elements_loading: state.ForgeViewer.model_elements_loading,
	visible_elements: state.ForgeViewer.visible_elements,
	hidden_elements: state.ForgeViewer.hidden_elements,
	disabled_elements: state.ForgeViewer.disabled_elements,
	selected_elements: state.ForgeViewer.selected_elements,
	colored_elements: state.ForgeViewer.colored_elements,
	isWorkersLogLabourInputActive: state.WorkersLog.LabourInput.General.IsActive,
});

const mapDispatchToProps = {
	SetSheetsSuccess: ForgeViewerActions.SetSheetsSuccess,
	StartViewer: ForgeViewerActions.StartViewer,
	EndViewer: ForgeViewerActions.EndViewer,
	SetViewerElements: ForgeViewerActions.SetViewerElements,
	SetElements: ForgeViewerActions.SetElements,
	CleanElements: ForgeViewerActions.CleanElements,
	handleSelectedElements: WorkProgressMonolithicUpgradingActions.HandleSelectElements,
	LabourInputHandleSelectObject: LabourInputObjectsActions.HandleSelectObject,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type State = { currentApp: ApplicationType };

class Viewer extends Component<Props, State> {
	private doc: Autodesk.Viewing.Document | null;
	private viewer: Autodesk.Viewing.GuiViewer3D | null;
	private _elements: ForgeViewer.Payload.Elements | undefined;

	private _options: Options = {
		strictVisibility: false,
	};

	constructor(props: Props) {
		super(props);
		this.viewer = null;
		this.doc = null;
		this.state = {
			currentApp: ApplicationType.Default,
		};
	}

	componentDidMount() {
		this.launchViewer(this.props.project_urn);
	}
	componentWillUnmount() {
		this.props.EndViewer();
	}
	componentDidUpdate(prevProps: Props, prevState: Readonly<State>) {
		this.OnProjectChange(prevProps, this.props);
		this.OnCurrentSheetChange(prevProps, this.props);
		this.ActiveAppSwitcher(this.props, prevState);
		this.ActiveModuleSelector(prevProps, this.props);
	}
	private OnProjectChange(previousProps: Props, actualProps: Props) {
		if (this.props.project_urn !== previousProps.project_urn) {
			this.launchViewer(this.props.project_urn);
		}
	}
	private OnCurrentSheetChange(prevProps: Props, props: Readonly<Props> & Readonly<{ children?: React.ReactNode }>) {
		if (prevProps.current_sheet !== this.props.current_sheet) {
			this.loadSheet();
		}
	}

	private ActiveAppSwitcher(props: Readonly<Props>, state: State) {
		let currentApp = ApplicationType.Default;
		switch (true) {
			case props.isWorkProgressMonolithicActive:
				currentApp = ApplicationType.WorkProgress_Monolithic;
				break;
			case props.isWorkersLogLabourInputActive:
				currentApp = ApplicationType.WorkersLog_LabourInput;
				break;
			default:
				break;
		}

		if (state.currentApp !== currentApp) this.setState({ currentApp: currentApp });
	}

	private ActiveModuleSelector(prevProps: Props, props: Readonly<Props> & Readonly<{ children?: React.ReactNode }>) {
		switch (true) {
			case props.isWorkProgressMonolithicActive:
				this.OnWorkProgressMonolithicModuleActive(prevProps, props);
				break;
			case props.isWorkersLogLabourInputActive:
				this.OnWorkersLogLabourInputActive(prevProps, props);
				break;
			default:
				this.OnDefaultActive(prevProps, props);
		}
	}

	private OnWorkersLogLabourInputActive(
		prevProps: Props,
		props: Readonly<Props> & Readonly<{ children?: React.ReactNode }>,
	) {
		this._options.strictVisibility = true;
		this.OnDefaultActive(prevProps, props);
	}

	private OnWorkProgressMonolithicModuleActive(
		prevProps: Props,
		props: Readonly<Props> & Readonly<{ children?: React.ReactNode }>,
	) {
		if (this.viewer) this.viewer.setContextMenu(null);
		this.OnDefaultActive(prevProps, props);
	}

	private OnDefaultActive(prevProps: Props, props: Readonly<Props> & Readonly<{ children?: React.ReactNode }>) {
		if (this.props.current_sheet && !this.props.model_elements_loading) {
			if (
				Viewer.isChanged(prevProps.visible_elements, props.visible_elements) ||
				Viewer.isChanged(prevProps.hidden_elements, props.hidden_elements)
			)
				this.handleVisibility(
					prevProps.visible_elements,
					props.visible_elements,
					prevProps.hidden_elements,
					props.hidden_elements,
				);

			if (Viewer.isChanged(prevProps.disabled_elements, props.disabled_elements))
				this.handleLock(prevProps.disabled_elements, props.disabled_elements);

			if (Viewer.isChanged(prevProps.selected_elements, props.selected_elements))
				this.handleSelect(props.selected_elements);

			if (Viewer.isChanged(prevProps.colored_elements, this.props.colored_elements))
				this.handleColorize(Object.values(props.colored_elements));
		}
	}

	private static isChanged(valueA: any, valueB: any) {
		return JSON.stringify(valueA) !== JSON.stringify(valueB);
	}

	loadSheet() {
		if (this.viewer && this.doc && this.props.current_sheet)
			this.viewer.loadDocumentNode(this.doc, this.doc.getRoot().findByGuid(this.props.current_sheet));
	}

	launchViewer(urn: string | undefined) {
		var options: Autodesk.Viewing.InitializerOptions = {
			env: 'AutodeskProduction',
			getAccessToken: (callback) =>
				this.props.login_3_legged &&
				callback &&
				callback(this.props.login_3_legged.access_token, this.props.login_3_legged.expires_in),
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
				const view3D = doc
					.getRoot()
					.search({ type: 'geometry' })
					.find((x) => x.is3D() && x.name().toLowerCase().includes('wspro'));
				this.props.SetSheetsSuccess(elements, view3D && { id: view3D.guid(), name: view3D.name() });
				this.props.StartViewer();
				if (!!this.props.current_sheet && this.viewer) {
					this.viewer.loadDocumentNode(this.doc, this.doc.getRoot().findByGuid(this.props.current_sheet));
				}
			};

			const onDocumentLoadFailure = (viewerErrorCode: Autodesk.Viewing.ErrorCodes) => {
				console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
			};

			const documentConteiner = document.getElementById('forgeViewer');
			if (documentConteiner) {
				const { Switch2D3DViewExtension } = await import('./extenstions/2D3DSwitchExtension');
				Switch2D3DViewExtension.register();
				// this.viewer.loadExtension('Switch2D3DViewExtension');
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
				Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
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

	SelectFunctionApplicationMap: {
		[key in ApplicationType]: (data: number[]) => void;
	} = {
		[ApplicationType.Default]: () => {},
		[ApplicationType.WorkersLog_LabourInput]: this.props.LabourInputHandleSelectObject,
		[ApplicationType.WorkProgress_Monolithic]: this.props.handleSelectedElements,
	};

	private OnSelectionChangedEvent(data: {
		fragIdsArray: number[];
		dbIdArray: number[];
		nodeArray: number[];
		model: Autodesk.Viewing.Model;
	}) {
		this.OnSelectionChange(data, this.SelectFunctionApplicationMap[this.state.currentApp]);
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
		if (this.viewer && Viewer.isChanged(data.dbIdArray, this.props.selected_elements)) {
			this.props.SetElements({ selected: data.dbIdArray });
			if (data.dbIdArray.length > 0) {
				this.viewer.model.getBulkProperties(
					data.dbIdArray,

					{ propFilter: ['name'] },
					(r: Autodesk.Viewing.PropertyResult[]) => {
						if (r.length > 0) {
							const selectedElement = r
								.map((dat) => {
									const match = dat.name?.match(/^.+\[(.+)\]$/);
									if (match) return parseInt(match[1]);
								})
								.filter((x) => !!x) as number[];
							reduxCallback(selectedElement);
						}
					},
					(err) => {
						console.log(err);
					},
				);
			} else {
				reduxCallback([]);
			}
		}
	}

	private OnObjectTreeCreatedEvent() {
		if (this.viewer) {
			try {
				const tree = this.viewer.model.getInstanceTree();
				const rootId = tree.getRootId();
				let elements: number[] = [];
				tree.enumNodeChildren(
					rootId,
					(dbID) => {
						if (tree.getChildCount(dbID) === 0) {
							elements.push(dbID);
						}
					},
					true,
				);
				this.viewer.model.getBulkProperties(
					elements,
					{ propFilter: ['name', elementParameterLevelName, warbudElementParameterLevelName] },
					(result) => {
						console.log(result);
						const extractedData = result
							.map((data) => {
								if (data.name) {
									let revit_id = /.+\[(.+)\]/g.exec(data.name);
									const level = data.properties.find(
										(x) =>
											!!x.displayValue &&
											[elementParameterLevelName, warbudElementParameterLevelName].includes(
												x.attributeName,
											),
									);
									if (revit_id && revit_id[1] && level)
										return {
											forgeId: data.dbId,
											rvtId: revit_id[1],
											levelName: level.displayValue,
										};
								}
							})
							.filter((x) => !!x) as ForgeViewer.Payload.Element[];
						this.props.SetViewerElements(extractedData);
					},
				);
				this.viewer.hide(rootId);
			} catch (e) {
				console.error(e.message || e);
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
				for (const { color, element } of this_colored_elements) {
					this.viewer.setThemingColor(
						element,
						new THREE.Vector4(color.r, color.g, color.b, color.a || 1),
						this.viewer.model,
					);
				}
			}
		}
	}

	handleLock(
		prevElement: ForgeViewer.Payload.ForgeElement[],
		this_disabled_elements: ForgeViewer.Payload.ForgeElement[],
		options?: Options,
	) {
		if (this.viewer) {
			if (this_disabled_elements.length > 0) {
				// @ts-ignore
				this.viewer.lockSelection(this_disabled_elements, true);
				if (prevElement.length > 0) {
					// @ts-ignore
					this.viewer.unlockSelection(prevElement.filter((e) => !this_disabled_elements.includes(e)));
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
			if (this._options.strictVisibility) {
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
