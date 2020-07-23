import React, { Component } from "react";
// import ShowRoomsExtension from "./extenstions/TestExtension";
import { connect } from "react-redux";
import { startViewer, setViewerRooms, setSheets } from "../redux/actions";
import { setSelectedRoom } from "../../../sites/odbiory/redux/rooms/actions";
import { initialiseModal } from "../../Modal/redux/actions";

const Autodesk = window.Autodesk;
class Viewer extends Component {
    rooms = [];

    viewer = null;
    componentDidMount() {
        this.launchViewer(this.props.model_urn);
    }

    launchViewer(urn) {
        var options = {
            env: "AutodeskProduction",
            getAccessToken: (callback) =>
                callback(
                    this.props.login_3_legged.access_token,
                    this.props.login_3_legged.expires_in
                ),
        };

        Autodesk.Viewing.Initializer(options, () => {
            const onDocumentLoadSuccess = (doc) => {
                var viewables = doc
                    .getRoot()
                    .search({ type: "geometry" })
                    .filter((e) => e.is2D());
                const elements = viewables.map((e) => ({
                    index: e.guid(),
                    name: e.name(),
                    element: e,
                }));
                this.props.setSheets(elements);
                // this.viewer.loadDocumentNode(doc, viewables[0]).then((i) => {
                this.props.startViewer(this.viewer, doc);
                // });
            };

            const onDocumentLoadFailure = (viewerErrorCode) => {
                console.error(
                    "onDocumentLoadFailure() - errorCode:" + viewerErrorCode
                );
            };

            this.viewer = new Autodesk.Viewing.GuiViewer3D(
                document.getElementById("forgeViewer"),
                {
                    extensions: [
                        "Autodesk.DocumentBrowser",
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
                }
            );

            this.viewer.addEventListener(
                Autodesk.Viewing.SELECTION_CHANGED_EVENT,
                ({ dbIdArray }) => {
                    this.viewer.model.getProperties(
                        dbIdArray[0],
                        (data) => {
                            if (data.name) {
                                const selectedElement = data.name.match(
                                    /^.+\[(.+)\]$/
                                )[1];
                                if (selectedElement) {
                                    const selectedRoom = this.props.Odbiory.Rooms.rooms.filter(
                                        (room) =>
                                            room.revit_id === selectedElement
                                    )[0];
                                    if (selectedRoom) {
                                        this.props.setSelectedRoom(
                                            selectedRoom.id
                                        );
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
                }
            );
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
    setSheets,
    startViewer,
    setViewerRooms,
    setSelectedRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
