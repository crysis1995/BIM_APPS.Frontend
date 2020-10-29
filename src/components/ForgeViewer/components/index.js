import { selectRoom } from '../../../sites/work_progress/redux/actions/rooms_actions';
import { ACCEPTANCE_TYPE } from '../../../sites/work_progress/redux/types/constans';
import { initialiseModal } from '../../Modal/redux/actions';
import { initializeViewer, setSheetsSuccess, setViewerElements, setViewerRooms } from '../redux/actions';
import ReactPanelExtension from './extenstions/TestExtension';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const Autodesk = window.Autodesk; // import Autodesk Library
const THREE = window.THREE; // import THREE library

class Viewer extends Component {
	constructor(props) {
		super(props);
		this.viewer = null;
		this.doc = null;
	}

	componentDidMount() {
		this.launchViewer(this.props.CMSLogin.project.urn);
	}

	componentDidUpdate(prevProps) {
		if (this.props.CMSLogin.project.urn !== prevProps.CMSLogin.project.urn) {
			this.launchViewer(this.props.CMSLogin.project.urn);
		}

		if (!!this.doc && !!this.viewer) {
			/*
			 *
			 * */
			if (
				prevProps.ForgeViewer.current_sheet !== this.props.ForgeViewer.current_sheet &&
				!!this.props.ForgeViewer.current_sheet
			) {
				this.loadSheet();
			}

			/*
			 *
			 * */
			if (
				prevProps.Odbiory.Rooms.selected_rooms.toString() !==
					this.props.Odbiory.Rooms.selected_rooms.toString() &&
				Object.keys(this.props.ForgeViewer.model_rooms).length > 0 &&
				this.props.Odbiory.Rooms.selected_rooms.length > 0
			) {
				this.selectRoomOnViewer();
			}

			/*
			 *
			 * */
			if (this.props.Odbiory.Results.status !== 'initial') {
				this.colorizeResults();
			}

			if (this.props.visible_element.length > 0) {
				console.log(prevProps.visible_element, this.props.visible_element);
				this.viewer.hide(
					prevProps.visible_element.filter((item) => !this.props.visible_element.includes(item)),
				);
				this.viewer.show(this.props.visible_element);
			}
		}
	}

	colorizeResults() {
		const { active_job_id, status } = this.props.Odbiory.Results;
		try {
			if (this.props.color && status === 'color') {
				this.colorByRoom(this.props.colored_element);
			} else {
				this.viewer.clearThemingColors();
			}
		} catch (e) {
			console.log(e);
		}
	}

	selectRoomOnViewer() {
		const roomIds = this.props.Odbiory.Rooms.selected_rooms.map((e) => this.props.ForgeViewer.model_rooms[e].dbID);
		const elementToSelect = roomIds.length > 0 ? roomIds : [];
		this.viewer.select(elementToSelect);
		this.viewer.fitToView(elementToSelect, this.viewer.model, true);
	}

	loadSheet() {
		this.viewer.loadDocumentNode(this.doc, this.doc.getRoot().findByGuid(this.props.ForgeViewer.current_sheet));
	}

	/**
	 *
	 * @param urn
	 */
	launchViewer(urn) {
		var options = {
			env: 'AutodeskProduction',
			getAccessToken: (callback) =>
				callback(
					this.props.Autodesk.login_3_legged.access_token,
					this.props.Autodesk.login_3_legged.expires_in,
				),
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
				if (!!this.props.ForgeViewer.current_sheet) {
					this.viewer.loadDocumentNode(
						this.doc,
						this.doc.getRoot().findByGuid(this.props.ForgeViewer.current_sheet),
					);
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
					this.viewer.hide(rootId);
					var elements = {};
					var rooms = {};

					if (this.props.Odbiory.OdbioryComponent.active_acceptance_type === ACCEPTANCE_TYPE.MONOLITHIC) {
						tree.enumNodeChildren(
							rootId,
							(dbID) => {
								if (tree.getChildCount(dbID) === 0) {
									let revit_id = /.+\[(.+)\]/g.exec(tree.getNodeName(dbID));

									if (revit_id) {
										if (tree.getNodeName(tree.getNodeParentId(dbID)) === 'Rooms')
											rooms[revit_id[1]] = { dbID };
										elements[revit_id[1]] = dbID;
									}
								}
							},
							true,
						);

						this.props.setViewerElements(elements);
					}
					if (this.props.Odbiory.OdbioryComponent.active_acceptance_type === ACCEPTANCE_TYPE.ARCHITECTURAL) {
						this.props.setViewerRooms(rooms);
					}
				}
			});

			this.viewer.addEventListener(
				Autodesk.Viewing.SELECTION_CHANGED_EVENT,
				// debounce(
				({ dbIdArray }) => {
					if (dbIdArray.length > 0) {
						this.viewer.model.getBulkProperties(
							dbIdArray,
							['Category', 'name'],
							(data) => {
								console.log(data);
								// gdy bedzie wybieranych wiecej pomieszczeń to trzeba tutaj zrobić pętle
								if (
									data.length > 0 &&
									data[0].properties[0].displayValue === 'Revit Rooms' &&
									!this.props.rooms_data_loading
								) {
									const selectedElement = data.map((dat) => dat.name.match(/^.+\[(.+)\]$/)[1]);
									if (
										selectedElement.toString() &&
										this.props.Odbiory.Rooms.selected_rooms.toString() !==
											selectedElement.toString()
									) {
										const selectedRoom = selectedElement.filter(
											(e) => this.props.Odbiory.Rooms.byId[e],
										);
										let difference = selectedRoom.filter(
											(e) => !this.props.Odbiory.Rooms.selected_rooms.includes(e),
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
				},
			);
		});
	}

	colorByRoom(colored_element) {
		colored_element.forEach((e) => {
			this.viewer.setThemingColor(e.id, new THREE.Vector4(e.color.r, e.color.g, e.color.b, 1), this.viewer.model);
		});
	}

	render() {
		return <div id="forgeViewer" />;
	}
}

const mapStateToProps = ({ ForgeViewer, Autodesk, Odbiory, CMSLogin }) => ({
	rooms_data_loading: ForgeViewer.model_rooms_loading || Odbiory.Rooms.rooms_loading,
	colored_element: ForgeViewer.colored_element,
	color: ForgeViewer.color,
	visible_element: ForgeViewer.visible_element,
	Autodesk,
	CMSLogin,
	ForgeViewer,
	Odbiory,
});

const mapDispatchToProps = {
	initialiseModal,
	setSheetsSuccess,
	initializeViewer,
	setViewerRooms,
	selectRoom,
	setViewerElements,
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
