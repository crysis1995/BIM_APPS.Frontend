import React, { Component } from 'react';
// import ShowRoomsExtension from "./extenstions/TestExtension";
import { connect } from 'react-redux';
import { config } from '../../../config';
import { setSelectedRoom } from '../../../sites/odbiory/redux/rooms/actions';
import { hexToRgb } from '../../../utils/hexToRgb';
import { initialiseModal } from '../../Modal/redux/actions';
import { initializeViewer, setSheetsSuccess, setViewerRooms } from '../redux/actions';


const Autodesk = window.Autodesk;
const THREE = window.THREE;
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
    if (
      prevProps.ForgeViewer.current_sheet !==
        this.props.ForgeViewer.current_sheet &&
      !!this.props.ForgeViewer.current_sheet &&
      !!this.doc &&
      !!this.viewer
    ) {
      this.viewer.loadDocumentNode(
        this.doc,
        this.doc.getRoot().findByGuid(this.props.ForgeViewer.current_sheet)
      );
    }
    if (
      prevProps.Odbiory.Rooms.selected_room !==
        this.props.Odbiory.Rooms.selected_room &&
      Object.keys(this.props.ForgeViewer.model_rooms).length > 0 &&
      this.props.Odbiory.Rooms.from_selector
    ) {
      if (this.props.Odbiory.Rooms.selected_room) {
        const roomIds = this.props.ForgeViewer.model_rooms[
          this.props.Odbiory.Rooms.selected_room
        ];
        const elementToSelect = roomIds ? roomIds.dbID : [];
        this.viewer.select(elementToSelect);
        this.viewer.fitToView(elementToSelect, this.viewer.model, true);
      } else {
        this.viewer.select([]);
      }
    }

    if (
      this.props.Odbiory.Results.active_job_id &&
      !this.props.ForgeViewer.model_rooms_loading
    ) {
      const { active_job_id, active } = this.props.Odbiory.Results;
      const { jobs } = this.props.Odbiory.Jobs;
      const { model_rooms } = this.props.ForgeViewer;
      this.colorByRoom(jobs[active_job_id], model_rooms);
    }
    if (
      prevProps.Odbiory.Results.active_job_id &&
      !this.props.Odbiory.Results.active_job_id &&
      !this.props.ForgeViewer.model_rooms_loading
    ) {
      this.viewer.clearThemingColors();
    }
  }

  launchViewer(urn) {
    var options = {
      env: "AutodeskProduction",
      getAccessToken: (callback) =>
        callback(
          this.props.Autodesk.login_3_legged.access_token,
          this.props.Autodesk.login_3_legged.expires_in
        ),
    };

    Autodesk.Viewing.Initializer(options, () => {
      const onDocumentLoadSuccess = (doc) => {
        this.doc = doc;
        var viewables = doc
          .getRoot()
          .search({ type: "geometry" })
          .filter((e) => e.is2D());
        const elements = viewables.map((e) => {
          return { index: e.guid(), name: e.name() };
        });
        this.props.setSheetsSuccess(elements);
        this.props.initializeViewer();
      };

      const onDocumentLoadFailure = (viewerErrorCode) => {
        console.error("onDocumentLoadFailure() - errorCode:" + viewerErrorCode);
      };

      this.viewer = new Autodesk.Viewing.GuiViewer3D(
        document.getElementById("forgeViewer"),
        {
          extensions: [
            // "Autodesk.DocumentBrowser",
            // "ShowRoomsExtension",
            // "Autodesk.AEC.LevelsExtension",
          ],
        }
      );

      this.viewer.start();
      var documentId = "urn:" + urn;
      Autodesk.Viewing.Document.load(
        documentId,
        onDocumentLoadSuccess,
        onDocumentLoadFailure
      );

      this.viewer.addEventListener(
        Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT,
        () => {
          const tree = this.viewer.model.getInstanceTree();
          const rootId = tree.getRootId();
          tree.enumNodeChildren(rootId, (roomCategoryId) => {
            if (tree.getNodeName(roomCategoryId) === "Rooms") {
              var rooms = {};
              tree.enumNodeChildren(roomCategoryId, (dbID) => {
                let revit_id = /.+\[(.+)\]/g.exec(tree.getNodeName(dbID))[1];
                rooms[revit_id] = { dbID };
              });
              this.props.setViewerRooms(rooms);
            }
          });
        }
      );

      this.viewer.addEventListener(
        Autodesk.Viewing.SELECTION_CHANGED_EVENT,
        ({ dbIdArray }) => {
          this.viewer.model.getProperties(
            dbIdArray[0],
            (data) => {
              if (data.name) {
                const selectedElement = data.name.match(/^.+\[(.+)\]$/)[1];
                if (selectedElement) {
                  const selectedRoom = this.props.Odbiory.Rooms.rooms[
                    selectedElement
                  ];
                  if (
                    this.props.Odbiory.Jobs.jobs_loading ||
                    this.props.Odbiory.Objects.objects_loading
                  ) {
                    this.viewer.clearSelection();
                  }

                  if (selectedRoom) {
                    this.props.setSelectedRoom(selectedRoom.revit_id, false);
                  } else {
                    this.viewer.clearSelection();
                    this.props.initialiseModal(
                      "Uwaga!",
                      "Nie przewidziano robót dla danego pomieszczenia."
                    );
                  }
                }
              } else {
                this.props.setSelectedRoom("", false);
                this.viewer.clearSelection();
              }
            },
            (a) => {
              console.log(a);
            }
          );
        }
      );
    });
  }

  colorByRoom(jobData, viewerModelMap) {
    const {
      unit,
      results: { elements },
    } = jobData;
    const setting_color_map = config.units["area"].color_map;
    let elemTable = [];
    for (let revit_id in viewerModelMap) {
      const percentage_value = elements[revit_id] * 100;
      let colorIndex = 1;
      if (percentage_value) {
        colorIndex = Object.keys(setting_color_map).filter((id) =>
          setting_color_map[id].condition(percentage_value)
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
