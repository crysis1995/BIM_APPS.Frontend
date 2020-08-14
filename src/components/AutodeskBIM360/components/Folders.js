import TreeItem from '@material-ui/lab/TreeItem';
import React from 'react';
// import AutodeskApi from "../../../utils/AutodeskApi";
import { connect } from 'react-redux';
// import { v4 } from "uuid";
// import Versions from "./Versions";
// import Items from "./Items";
// import Folder from "./Folders";

function Folders(props) {
      console.count("Folders");
      console.log(props);
      return props.projectTopFolders.map((item) => (
            <TreeItem nodeId={item.id} label={item.attributes.displayName}>
                  {/*{data.length > 0*/}
                  {/*      ? data.map((e) => {*/}
                  {/*              switch (e.type) {*/}
                  {/*                    case "folders":*/}
                  {/*                          return (*/}
                  {/*                                <Folders*/}
                  {/*                                      key={v4()}*/}
                  {/*                                />*/}
                  {/*                          );*/}
                  {/*                    case "items":*/}
                  {/*                          return (*/}
                  {/*                                <Items key={v4()} item={e} />*/}
                  {/*                          );*/}
                  {/*                    case "versions":*/}
                  {/*                          return (*/}
                  {/*                                <Versions*/}
                  {/*                                      key={v4()}*/}
                  {/*                                      item={e}*/}
                  {/*                                />*/}
                  {/*                          );*/}
                  {/*                    default:*/}
                  {/*                          return null;*/}
                  {/*              }*/}
                  {/*        })*/}
                  {/*      : null}*/}
            </TreeItem>
      ));
}

const mapStateToProps = ({ AutodeskBIM360 }) => ({
      projectTopFolders: AutodeskBIM360.projectTopFolders,
});

export default connect(mapStateToProps)(Folders);
// export default Folders;
