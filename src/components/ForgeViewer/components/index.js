import { debounce } from 'lodash';
import React, { Component } from 'react';
import ReactPanelExtension from './extenstions/TestExtension';
import { connect } from 'react-redux';

import { config } from '../../../config';
import { setSelectedRoom } from '../../../sites/work_progress/redux/rooms/actions';
import { hexToRgb } from '../../../utils/hexToRgb';
import { initialiseModal } from '../../Modal/redux/actions';
import { initializeViewer, setSheetsSuccess, setViewerRooms } from '../redux/actions';

const Autodesk = window.Autodesk; // import Autodesk Library
const THREE = window.THREE; // import THREE library

class Viewer extends Component {
	constructor(props) {
		super(props);
		this.viewer = null;
		this.doc = null;
	}

	componentDidMount() {
		this.launchViewer(this.props.ForgeViewer.model_urn);
	}

	componentDidUpdate(prevProps) {
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
				this.props.Odbiory.Rooms.from_selector &&
				this.props.Odbiory.Rooms.selected_rooms
			) {
				this.selectRoomOnViewer();
			}

			/*
			 *
			 * */
			if (this.props.Odbiory.Results.status !== 'initial') {
				this.colorizeResults();
			}
		}
	}

	colorizeResults() {
		const { active_job_id, status } = this.props.Odbiory.Results;
		const { jobs } = this.props.Odbiory.Jobs;
		const { model_rooms } = this.props.ForgeViewer;
		if (status === 'color' && jobs && model_rooms) {
			this.colorByRoom(jobs[active_job_id], model_rooms);
		}
		if (status === 'clean') {
			this.viewer.clearThemingColors();
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
				const tree = this.viewer.model.getInstanceTree();
				const rootId = tree.getRootId();
				tree.enumNodeChildren(rootId, (roomCategoryId) => {
					if (tree.getNodeName(roomCategoryId) === 'Rooms') {
						var rooms = {};
						tree.enumNodeChildren(roomCategoryId, (dbID) => {
							let revit_id = /.+\[(.+)\]/g.exec(tree.getNodeName(dbID))[1];
							rooms[revit_id] = { dbID };
						});
						this.props.setViewerRooms(rooms);
					}
				});
			});

			this.viewer.addEventListener(
				Autodesk.Viewing.SELECTION_CHANGED_EVENT,
				debounce(({ dbIdArray }) => {
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
									this.props.Odbiory.Rooms.selected_rooms.toString() !== selectedElement.toString()
								) {
									console.log(
										{
											storage: this.props.Odbiory.Rooms.selected_rooms.toString(),
											viewer: selectedElement.toString(),
										},
										this.props.Odbiory.Rooms.selected_rooms.toString() !==
											selectedElement.toString(),
									);
									const selectedRoom = selectedElement.filter(
										(e) => this.props.Odbiory.Rooms.rooms[e],
									);
									if (selectedRoom) {
										this.props.setSelectedRoom(selectedRoom, false);
									} else {
										this.viewer.clearSelection();
										this.props.initialiseModal(
											'Uwaga!',
											'Nie przewidziano robót dla danego pomieszczenia.',
										);
									}
								}
							}
						},
						(a) => {
							console.log(a);
						},
					);
				}, 1000), // opóźnienie kolekcjonowania i wykonywania akcji zaznaczania roomów
			);
		});
	}

	colorByRoom(jobData, viewerModelMap) {
		const {
			unit,
			results: { elements },
		} = jobData;
		const setting_color_map = config.units['area'].color_map;
		let elemTable = [];
		for (let revit_id in viewerModelMap) {
			const percentage_value = elements[revit_id] * 100;
			let colorIndex = 1;
			if (percentage_value) {
				colorIndex = Object.keys(setting_color_map).filter((id) =>
					setting_color_map[id].condition(percentage_value),
				)[0];
			}
			const color = hexToRgb(setting_color_map[colorIndex].color, true);
			elemTable.push({
				dbID: viewerModelMap[revit_id].dbID,
				color: new THREE.Vector4(color.r, color.g, color.b, 1),
			});
		}
		elemTable.forEach((e) => {
			this.viewer.setThemingColor(e.dbID, e.color, this.viewer.model);
		});
	}

	render() {
		return <div id="forgeViewer" />;
	}
}

const mapStateToProps = ({ ForgeViewer, Autodesk, Odbiory }) => ({
	rooms_data_loading: ForgeViewer.model_rooms_loading || Odbiory.Rooms.rooms_loading,
	Autodesk,
	ForgeViewer,
	Odbiory,
});

const mapDispatchToProps = {
	initialiseModal,
	setSheetsSuccess,
	initializeViewer,
	setViewerRooms,
	setSelectedRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
