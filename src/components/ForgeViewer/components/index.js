import React, { Component } from "react";
// import ShowRoomsExtension from "./extenstions/TestExtension";
import { connect } from "react-redux";
import { initializeViewer, setViewerRooms, setSheetsError, setSheetsSuccess } from "../redux/actions";
import { setSelectedRoom } from "../../../sites/odbiory/redux/rooms/actions";
import { initialiseModal } from "../../Modal/redux/actions";

const Autodesk = window.Autodesk;
class Viewer extends Component {
    constructor(props) {
        super(props);
        this.viewer = null;
        this.doc = null;
    }

    componentDidMount() {
        this.launchViewer(this.props.model_urn);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.current_sheet !== this.props.current_sheet && !!this.props.current_sheet) {
            this.viewer.loadDocumentNode(this.doc, this.doc.getRoot().findByGuid(this.props.current_sheet));
            console.log(this.props.current_sheet);
        }
    }

    launchViewer(urn) {
        var options = {
            env: "AutodeskProduction",
            getAccessToken: (callback) =>
                callback(this.props.login_3_legged.access_token, this.props.login_3_legged.expires_in),
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
                // this.viewer.loadDocumentNode(doc, viewables[0]).then((i) => {
                this.props.initializeViewer();
                // });
            };

            const onDocumentLoadFailure = (viewerErrorCode) => {
                console.error("onDocumentLoadFailure() - errorCode:" + viewerErrorCode);
            };

            this.viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById("forgeViewer"), {
                extensions: [
                    "Autodesk.DocumentBrowser",
                    // "ShowRoomsExtension",
                    // "Autodesk.AEC.LevelsExtension",
                ],
            });

            this.viewer.start();
            var documentId = "urn:" + urn;
            Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);

            this.viewer.addEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, () => {
                const tree = this.viewer.model.getInstanceTree();
                const rootId = tree.getRootId();
                tree.enumNodeChildren(rootId, (roomCategoryId) => {
                    if (tree.getNodeName(roomCategoryId) === "Rooms") {
                        var rooms = [];
                        tree.enumNodeChildren(roomCategoryId, (dbID) => {
                            rooms.push({
                                id: dbID,
                                name: tree.getNodeName(dbID),
                            });
                        });
                        this.props.setViewerRooms(rooms);
                    }
                });
            });

            this.viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, ({ dbIdArray }) => {
                this.viewer.model.getProperties(
                    dbIdArray[0],
                    (data) => {
                        if (data.name) {
                            const selectedElement = data.name.match(/^.+\[(.+)\]$/)[1];
                            if (selectedElement) {
                                const selectedRoom = this.props.Odbiory.Rooms.rooms.filter(
                                    (room) => room.revit_id === selectedElement
                                )[0];
                                if (selectedRoom) {
                                    this.props.setSelectedRoom(selectedRoom.id);
                                } else {
                                    this.viewer.clearSelection();
                                    this.props.initialiseModal(
                                        "Uwaga!",
                                        "Nie przewidziano robót dla danego pomieszczenia."
                                    );
                                }
                            }
                        } else {
                            this.props.setSelectedRoom("");
                            this.viewer.clearSelection();
                        }
                    },
                    () => {}
                );
            });
        });
    }

    render() {
        return <div id="forgeViewer" />;
    }
}

const mapStateToProps = ({ ForgeViewer, AutodeskLogin, Odbiory }) => ({
    ...AutodeskLogin,
    ...ForgeViewer,
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
