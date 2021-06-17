import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../store';
import ForgeViewerActions from '../redux/actions';
import ForgeViewer from '../types';
import WorkProgressMonolithicUpgradingActions from '../../../sites/work_progress/redux/monolithic/upgrading/actions';

const mapStateToProps = (state: RootState) => ({
	login_3_legged: state.Autodesk.login_3_legged,
	project_urn: state.CMSLogin.actual_project?.urn,
	current_sheet: state.ForgeViewer.current_sheet,
	isWorkProgressMonolithicActive: state.WorkProgress.Monolithic.General.active,
	model_elements_loading: state.ForgeViewer.model_elements_loading,
	visible_elements: state.ForgeViewer.visible_elements,
	hidden_elements: state.ForgeViewer.hidden_elements,
	disabled_elements: state.ForgeViewer.disabled_elements,
	selected_elements: state.ForgeViewer.selected_elements,
	colored_elements: state.ForgeViewer.colored_elements,
});

const mapDispatchToProps = {
	SetSheetsSuccess: ForgeViewerActions.SetSheetsSuccess,
	StartViewer: ForgeViewerActions.StartViewer,
	EndViewer: ForgeViewerActions.EndViewer,
	SetViewerElements: ForgeViewerActions.SetViewerElements,
	SetElements: ForgeViewerActions.SetElements,
	CleanElements: ForgeViewerActions.CleanElements,
	handleSelectedElements: WorkProgressMonolithicUpgradingActions.HandleSelectElements,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
type State = {};

class Viewer extends Component<Props, State> {
	private doc: Autodesk.Viewing.Document | null;
	private viewer: Autodesk.Viewing.GuiViewer3D | null;

	constructor(props: Props) {
		super(props);
		this.viewer = null;
		this.doc = null;
	}

	componentDidMount() {
		this.launchViewer(this.props.project_urn);
	}
	componentWillUnmount() {
		this.props.EndViewer();
	}
	componentDidUpdate(prevProps: Props) {
		this.OnProjectChange(prevProps, this.props);
		this.OnCurrentSheetChange(prevProps, this.props);

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

	private ActiveModuleSelector(prevProps: Props, props: Readonly<Props> & Readonly<{ children?: React.ReactNode }>) {
		switch (true) {
			case props.isWorkProgressMonolithicActive:
				this.OnWorkProgressMonolithicModuleActive(prevProps, props);
				break;
			default:
				this.OnDefaultActive(prevProps, props);
		}
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

	private onWorkProgressMonolithicActive(callback: () => void) {
		if (this.props.isWorkProgressMonolithicActive) callback();
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
				this.props.SetSheetsSuccess(elements);
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

	private OnSelectionChangedEvent(data: {
		fragIdsArray: number[];
		dbIdArray: number[];
		nodeArray: number[];
		model: Autodesk.Viewing.Model;
	}) {
		this.onWorkProgressMonolithicActive.call(this, () => {
			this.OnSelectionChange(data);
		});
	}

	private OnSelectionChange(data: {
		fragIdsArray: number[];
		dbIdArray: number[];
		nodeArray: number[];
		model: Autodesk.Viewing.Model;
	}) {
		if (this.viewer && Viewer.isChanged(data.dbIdArray, this.props.selected_elements)) {
			this.props.SetElements({ selected: data.dbIdArray });
			if (data.dbIdArray.length > 0) {
				this.viewer.model.getBulkProperties(
					data.dbIdArray,
					['name'],
					(r: Autodesk.Viewing.PropertyResult[]) => {
						if (r.length > 0) {
							const selectedElement = r
								.map((dat) => {
									const match = dat.name?.match(/^.+\[(.+)\]$/);
									if (match) return parseInt(match[1]);
								})
								.filter((x) => !!x) as number[];
							this.props.handleSelectedElements(selectedElement);
						}
					},
					(err) => {
						console.log(err);
					},
				);
			} else {
				this.props.handleSelectedElements([]);
			}
		}
	}

	private OnObjectTreeCreatedEvent() {
		if (this.viewer) {
			try {
				const tree = this.viewer.model.getInstanceTree();
				const rootId = tree.getRootId();
				let elements: ForgeViewer.Payload.Elements = [];
				tree.enumNodeChildren(
					rootId,
					(dbID) => {
						if (tree.getChildCount(dbID) === 0) {
							let revit_id = /.+\[(.+)\]/g.exec(tree.getNodeName(dbID));
							if (revit_id && revit_id[1]) {
								let Element: ForgeViewer.Payload.Element = {
									rvtId: revit_id[1],
									forgeId: dbID,
								};
								elements.push(Element);
							}
						}
					},
					true,
				);
				this.viewer.hide(rootId);
				this.props.SetViewerElements(elements);
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
			this.viewer.hide(actual_hidden_elements);
			this.viewer.show(actual_visible_elements);
		}
	}

	render() {
		console.count('forgeViewer');
		return <div id="forgeViewer" />;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
