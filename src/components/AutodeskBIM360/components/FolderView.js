import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TreeView from '@material-ui/lab/TreeView';
import React from 'react';
import { connect } from 'react-redux';
import Folders from './Folders';


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
