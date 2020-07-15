import React from "react";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Folders from "./Folders";
import { connect } from "react-redux";

function FolderView(props) {
      return props.projectTopFolders.length > 0 ? (
            <>
                  <hr />
                  <TreeView
                        onNodeSelect={(e, val) => console.log(val)}
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                  >
                        <Folders />
                  </TreeView>
            </>
      ) : null;
}

const mapStateToProps = ({ AutodeskBIM360 }) => ({
      ...AutodeskBIM360,
});

export default connect(mapStateToProps)(FolderView);
