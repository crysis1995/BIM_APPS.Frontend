import store from '../../../store';
import { viewerActions } from '../redux';

const Autodesk = window.Autodesk;

class ShowRoomsExtension extends Autodesk.Viewing.Extension {
	constructor(viewer, options) {
		super(viewer, options);
		this.viewer = viewer;
		this.rooms = [];
	}
	selection = null;

	load() {
		console.log('ShowRoomsExtension has been loaded');

		this.viewer.addEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, () => {
			store.dispatch(viewerActions.set_viewer(this.viewer));
			this._getRoomCategory().then((e) =>
				this._getRooms(e, this.rooms).then((data) => {
					store.dispatch(viewerActions.get_rooms(data));
				})
			);
		});

		// this.viewer.addEventListener(
		//       Autodesk.Viewing.SELECTION_CHANGED_EVENT,
		//       () => {
		//             if (
		//                   this.viewer.getSelection() !==
		//                   store.getState().viewer.selected
		//             )
		//                   store.dispatch(
		//                         viewerActions.select_rooms(
		// 					this.viewer.getSelection()
		//                         )
		//                   );
		//       }
		// );

		store.subscribe(() => {
			/*
			 * 	kiedy zmienia się zaznaczenie
			 * */
			if (this.selection !== store.getState().viewer.selected) {
				this.handleSelection(store.getState().viewer.selected);
				// this.viewer.select(
				//       ,
				//       this.viewer.model,
				//       Autodesk.Viewing.SelectionType.REGULAR
				// );
				this.viewer.isolate(store.getState().viewer.selected);
			}
		});

		return true;
	}

	unload() {
		// Clean our UI elements if we added any
		if (this._group) {
			this._group.removeControl(this._button);
			if (this._group.getNumberOfControls() === 0) {
				this.viewer.toolbar.removeControl(this._group);
			}
		}
		console.log('ShowRoomsExtension has been unloaded');
		return true;
	}

	// onToolbarCreated() {
	//       // Create a new toolbar group if it doesn't exist
	//       this._group = this.viewer.toolbar.getControl(
	//             "allMyAwesomeExtensionsToolbar"
	//       );
	//       if (!this._group) {
	//             this._group = new Autodesk.Viewing.UI.ControlGroup(
	//                   "allMyAwesomeExtensionsToolbar"
	//             );
	//             this.viewer.toolbar.addControl(this._group);
	//       }
	//
	//       // Add a new button to the toolbar group
	//       this._button = new Autodesk.Viewing.UI.Button(
	//             "ShowRoomsExtensionButton"
	//       );
	//       // this._buttonChart = new Autodesk.Viewing.UI.Button(
	//       //       "Charts"
	//       // );
	//
	//       this._button.onClick = (ev) => {
	//             if (this._panel == null) {
	//                   this._panel = this.panel = new ReactPanel(this.viewer, {
	//                         id: "react-panel-id",
	//                         title: "React Panel",
	//                         rooms: this.rooms,
	//                         functions: {
	//                               handleSelection: this.handleSelection,
	//                         },
	//                   });
	//             }
	//             // Show/hide docking panel
	//             this._panel.setVisible(!this._panel.isVisible());
	//
	//             // If panel is NOT visible, exit the function
	//             if (!this._panel.isVisible()) {
	//                   return;
	//             }
	//       };
	//       this._button.setToolTip("Show Rooms Extension");
	//       this._button.addClass("handleSelectionExtensionIcon");
	//       this._group.addControl(this._button);
	//       // this._buttonChart.setToolTip("Show Rooms Extension");
	//       // this._buttonChart.addClass("handleSelectionExtensionIcon");
	//       // this._group.addControl(this._buttonChart);
	// }

	_getRoomCategory = () => {
		return new Promise((resolve) => {
			const tree = this.viewer.model.getInstanceTree();
			const rootId = tree.getRootId();
			tree.enumNodeChildren(rootId, (dbId) => {
				if (tree.getNodeName(dbId) === 'Rooms') resolve(dbId);
			});
		});
	};

	_getRooms = (roomCategoryId, node) => {
		return new Promise((res) => {
			const tree = this.viewer.model.getInstanceTree();
			tree.enumNodeChildren(roomCategoryId, (dbID) => {
				node.push({
					value: dbID,
					label: tree.getNodeName(dbID),
				});
			});
			res(node);
		});
	};

	handleSelection = (dbids) => {
		this.viewer.select(dbids, this.viewer.model, Autodesk.Viewing.SelectionType.REGULAR);
	};
}

Autodesk.Viewing.theExtensionManager.registerExtension('ShowRoomsExtension', ShowRoomsExtension);

export default ShowRoomsExtension;
