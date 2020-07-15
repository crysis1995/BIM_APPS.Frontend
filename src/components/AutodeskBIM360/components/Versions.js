import React from "react";
import TreeItem from "@material-ui/lab/TreeItem";
import AutodeskApi from "../../../utils/AutodeskApi";
import { connect } from "react-redux";
import { v4 } from "uuid";

class Items extends React.Component {
      componentDidMount() {
            console.log(this.props.item.type);
      }

      render() {
            return (
                  <TreeItem

                        nodeId={this.props.item.id}
                        label={this.props.item.attributes.displayName}
                  />
            );
      }
}

const mapStateToProps = (state) => ({
      ...state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Items);
