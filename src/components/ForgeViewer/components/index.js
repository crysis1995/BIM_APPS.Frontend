import { selectRoom } from '../../../sites/work_progress/redux/actions/rooms_actions';
import { handleSelectedElements } from '../../../sites/work_progress/redux/actions/upgrading_actions';
import { ACCEPTANCE_TYPE } from '../../../sites/work_progress/redux/types/constans';
import { initialiseModal } from '../../Modal/redux/actions';
import {
	initializeViewer,
	selectedElementsAdd,
	setSheetsSuccess,
	setViewerElements,
	setViewerRooms,
} from '../redux/actions';
import ReactPanelExtension from './extenstions/TestExtension';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const Autodesk = window.Autodesk; // import Autodesk Library
const THREE = window.THREE; // import THREE library

const TESTS = true;

class Viewer extends Component {
	constructor(props) {
		super(props);
		this.viewer = null;
		this.doc = null;
	}

	componentDidMount() {
		this.launchViewer(this.props.project_urn);
	}

	componentDidUpdate(prevProps) {
		if (this.props.project_urn !== prevProps.project_urn) {
			this.launchViewer(this.props.project_urn);
		}

		if (!!this.doc && !!this.viewer) {
			/*
			 *
			 * */
			if (prevProps.current_sheet !== this.props.current_sheet && !!this.props.current_sheet) {
				this.loadSheet();
			}
			/**
			 *      ODBIORY WYKOŃCZENIÓWKI
			 *
			 *
			 */
			if (this.props.active_acceptance_type === ACCEPTANCE_TYPE.ARCHITECTURAL) {
				if (this.viewer.contextMenu) this.viewer.setContextMenu(null);
				if (
					prevProps.selected_rooms.toString() !== this.props.selected_rooms.toString() &&
					Object.keys(this.props.model_rooms).length > 0 &&
					this.props.selected_rooms.length > 0
				) {
					this.selectRoomOnViewer();
				}
				if (this.props.current_sheet && !this.props.rooms_data_loading) {
					this.handleColorize(
						Object.entries(prevProps.colored_elements),
						Object.entries(this.props.colored_elements),
					);
				}
			}
			/**
			 *      ODBIORY KONSTRUKCJI
			 *
			 *
			 */
			if (this.props.active_acceptance_type === ACCEPTANCE_TYPE.MONOLITHIC) {
				if (this.viewer.contextMenu) this.viewer.setContextMenu(null);
				if (TESTS && this.props.current_sheet && !this.props.model_elements_loading) {
					this.handleVisibility(
						prevProps.visible_elements,
						this.props.visible_elements,
						prevProps.hidden_elements,
						this.props.hidden_elements,
					);

					this.handleLock(prevProps.disabled_elements, this.props.disabled_elements);
					this.handleSelect(prevProps.selected_elements, this.props.selected_elements);
					this.handleColorize(
						Object.entries(prevProps.colored_elements),
						Object.entries(this.props.colored_elements),
					);
				}
			}
		}
	}

	selectRoomOnViewer() {
		const roomIds = this.props.selected_rooms.map((e) => this.props.model_rooms[e].dbID);
		const elementToSelect = roomIds.length > 0 ? roomIds : [];
		this.viewer.select(elementToSelect);
		this.viewer.fitToView(elementToSelect, this.viewer.model, true);
	}

	loadSheet() {
		this.viewer.loadDocumentNode(this.doc, this.doc.getRoot().findByGuid(this.props.current_sheet));
	}

	/**
	 *
	 * @param urn
	 */
	launchViewer(urn) {
		var options = {
			env: 'AutodeskProduction',
			getAccessToken: (callback) =>
				callback(this.props.login_3_legged.access_token, this.props.login_3_legged.expires_in),
		};

		Autodesk.Viewing.Initializer(options, () => {
			const onDocumentLoadSuccess = (doc) => {
				this.doc = doc;
				var viewables = doc
					.getRoot()
					.search({ type: 'geometry' })
					.filter((e) => e.is2D());
				const elements = viewables.map((e) => {
					return { index: e.guid(), name: e.name() };
				});
				this.props.setSheetsSuccess(elements);
				this.props.initializeViewer();
				if (!!this.props.current_sheet) {
					this.viewer.loadDocumentNode(this.doc, this.doc.getRoot().findByGuid(this.props.current_sheet));
				}
			};

			const onDocumentLoadFailure = (viewerErrorCode) => {
				console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
			};

			this.viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), {
				extensions: [
					'Autodesk.DocumentBrowser',
					'Autodesk.Edit2D',
					// 'Autodesk.Measure',
					// "ShowRoomsExtension",
					// "Autodesk.AEC.LevelsExtension"
					'Viewing.Extension.ReactPanel',
				],
			});

			this.viewer.start();
			var documentId = 'urn:' + urn;
			Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);

			this.viewer.addEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, () => {
				if (this.viewer) {
					const tree = this.viewer.model.getInstanceTree();
					const rootId = tree.getRootId();

					var elements = {};
					var rooms = {};

					if (this.props.active_acceptance_type === ACCEPTANCE_TYPE.MONOLITHIC) {
						this.viewer.hide(rootId);
						tree.enumNodeChildren(
							rootId,
							(dbID) => {
								if (tree.getChildCount(dbID) === 0) {
									let revit_id = /.+\[(.+)\]/g.exec(tree.getNodeName(dbID));

									if (revit_id) {
										elements[revit_id[1]] = dbID;
									}
								}
							},
							true,
						);

						this.props.setViewerElements(elements);
					}
					if (this.props.active_acceptance_type === ACCEPTANCE_TYPE.ARCHITECTURAL) {
						tree.enumNodeChildren(
							rootId,
							(dbID) => {
								if (tree.getChildCount(dbID) === 0) {
									let revit_id = /.+\[(.+)\]/g.exec(tree.getNodeName(dbID));

									if (revit_id) {
										if (tree.getNodeName(tree.getNodeParentId(dbID)) === 'Rooms')
											rooms[revit_id[1]] = dbID;
									}
								}
							},
							true,
						);

						this.props.setViewerRooms(rooms);
					}
				}
			});

			this.viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, ({ dbIdArray }) => {
				if (this.props.active_acceptance_type === ACCEPTANCE_TYPE.MONOLITHIC) {
					if (JSON.stringify(dbIdArray) !== JSON.stringify(this.props.selected_elements)) {
						this.props.selectedElementsAdd(dbIdArray);
						if (dbIdArray.length > 0) {
							this.viewer.model.getBulkProperties(
								dbIdArray,
								['name'],
								(data) => {
									if (data.length > 0) {
										const selectedElement = data.map((dat) => dat.name.match(/^.+\[(.+)\]$/)[1]);
										this.props.handleSelectedElements(selectedElement);
									}
								},
								(a) => {
									console.log(a);
								},
							);
						} else {
							this.props.handleSelectedElements([]);
						}
					}
				} else if (this.props.active_acceptance_type === ACCEPTANCE_TYPE.ARCHITECTURAL) {
					if (dbIdArray.length > 0) {
						this.viewer.model.getBulkProperties(
							dbIdArray,
							['Category', 'name'],
							(data) => {
								// gdy bedzie wybieranych wiecej pomieszczeń to trzeba tutaj zrobić pętle
								if (
									data.length > 0 &&
									data[0].properties[0].displayValue === 'Revit Rooms' &&
									!this.props.rooms_data_loading
								) {
									const selectedElement = data.map((dat) => dat.name.match(/^.+\[(.+)\]$/)[1]);
									if (
										selectedElement.toString() &&
										this.props.selected_rooms.toString() !== selectedElement.toString()
									) {
										const selectedRoom = selectedElement.filter((e) => this.props.room_by_Id[e]);
										let difference = selectedRoom.filter(
											(e) => !this.props.selected_rooms.includes(e),
										)[0];
										if (difference) {
											this.props.selectRoom(difference, '', false);
										}
									}
								}
							},
							(a) => {
								console.log(a);
							},
						);
					} else {
						this.props.selectRoom([], 'clear', false);
					}
				}
			});
		});
	}

	colorByRoom(colored_element) {
		colored_element.forEach((e) => {
			this.viewer.setThemingColor(e.id, new THREE.Vector4(e.color.r, e.color.g, e.color.b, 1), this.viewer.model);
		});
	}

	handleSelect(prev_selected_elements, actual_selected_elements) {
		if (JSON.stringify(prev_selected_elements) !== JSON.stringify(actual_selected_elements)) {
			this.viewer.select(actual_selected_elements);
		}
	}

	handleColorize(prev_colored_elements, this_colored_elements) {
		if (JSON.stringify(prev_colored_elements) !== JSON.stringify(this_colored_elements)) {
			this.viewer.clearThemingColors();
			if (this_colored_elements.length > 0) {
				this_colored_elements.forEach(([element, color]) =>
					this.viewer.setThemingColor(
						element,
						new THREE.Vector4(color.r, color.g, color.b, color.a || 1),
						this.viewer.model,
					),
				);
			}
		}
	}

	handleLock(prev_disabled_elements, this_disabled_elements) {
		if (JSON.stringify(prev_disabled_elements) !== JSON.stringify(this_disabled_elements)) {
			if (this_disabled_elements.length > 0) {
				this.viewer.lockSelection(this_disabled_elements, true);
				if (prev_disabled_elements.length > 0) {
					this.viewer.unlockSelection(
						prev_disabled_elements.filter((e) => !this_disabled_elements.includes(e)),
					);
				}
			} else {
				prev_disabled_elements.length > 0 && this.viewer.unlockSelection(prev_disabled_elements);
			}
		}
	}
	handleVisibility(prev_visible_elements, actual_visible_elements, prev_hidden_elements, actual_hidden_elements) {
		if (prev_hidden_elements.toString() !== actual_hidden_elements) {
			this.viewer.hide(actual_hidden_elements);
		}
		if (prev_visible_elements.toString() !== actual_visible_elements) {
			this.viewer.show(actual_visible_elements);
		}
	}

	render() {
		console.count('RENDER');
		return <div id="forgeViewer" />;
	}
}

const mapStateToProps = ({ ForgeViewer, Autodesk, Odbiory, CMSLogin }) => ({
	rooms_data_loading: ForgeViewer.model_rooms_loading || Odbiory.Rooms.rooms_loading,
	colored_element: ForgeViewer.colored_element,
	color: ForgeViewer.color,
	visible_element: ForgeViewer.visible_element,
	model_elements_loading: ForgeViewer.model_elements_loading,
	login_3_legged: Autodesk.login_3_legged,
	project_urn: CMSLogin.project.urn,
	status: Odbiory.Results.status,

	selected_rooms: Odbiory.Rooms.selected_rooms,
	room_by_Id: Odbiory.Rooms.byId,
	model_rooms: ForgeViewer.model_rooms,
	active_acceptance_type: Odbiory.OdbioryComponent.active_acceptance_type,
	current_sheet: ForgeViewer.current_sheet,
	selected_elements: ForgeViewer.selected_elements,
	colored_elements: ForgeViewer.colored_elements,
	disabled_elements: ForgeViewer.disabled_elements,
	hidden_elements: ForgeViewer.hidden_elements,
	visible_elements: ForgeViewer.visible_elements,
});

const mapDispatchToProps = {
	initialiseModal,
	setSheetsSuccess,
	initializeViewer,
	setViewerRooms,
	selectRoom,
	setViewerElements,
	handleSelectedElements,
	selectedElementsAdd,
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
