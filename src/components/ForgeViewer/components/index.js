import React, { Component } from "react";
// import ShowRoomsExtension from "./extenstions/TestExtension";
import { connect } from "react-redux";
import { startViewer, setViewerRooms } from "../redux/actions";
import { setSelectedRoom } from "../../odbiory/redux/actions";

const Autodesk = window.Autodesk;
class Viewer extends Component {
    rooms = [];

    viewer = null;
    componentDidMount() {
        console.log(this.props.model_urn)
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
                // console.log(doc);
                // this.props.handleViewer(this.state.viewer);

                // var viewables = doc.getRoot().getNamedViews();
                var viewables = doc.getRoot().search({ type: "geometry" });
                this.viewer.loadDocumentNode(doc, viewables[3]).then((i) => {
                    this.props.startViewer(this.viewer);
                });
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
                                    const selectedRoom = this.props.rooms.filter(
                                        (room) =>
                                            room.revit_id === selectedElement
                                    )[0];
                                    if (selectedRoom) {
                                        this.props.setSelectedRoom(
                                            selectedRoom.id
                                        );
                                    }
                                }
                            } else {
                                this.props.setSelectedRoom("");
                            }

                            // const selectedElement = data.properties.filter(
                            //     (e) => e.displayName === "Number"
                            // )[0];
                            // if (selectedElement) {
                            //     const selectedRoom = this.props.rooms.filter(
                            //         (room) =>
                            //             room.room_number ===
                            //             selectedElement.displayValue
                            //     )[0];
                            //     if (selectedRoom) {
                            //         this.props.setSelectedRoom(selectedRoom.id);
                            //     }
                            // }
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

const mapStateToProps = ({
    ForgeViewerReducer,
    AutodeskLogin,
    RoomsReducer,
}) => ({
    ...AutodeskLogin,
    ...ForgeViewerReducer,
    ...RoomsReducer,
});

const mapDispatchToProps = {
    startViewer,
    setViewerRooms,
    setSelectedRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
