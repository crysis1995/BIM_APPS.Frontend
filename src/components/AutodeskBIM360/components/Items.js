import React from "react";
import TreeItem from "@material-ui/lab/TreeItem";
import { connect } from "react-redux";

function Items(props) {
      return (
            <TreeItem
                  nodeId={props.item.id}
                  label={props.item.attributes.displayName}
            />
      );
}

const mapStateToProps = (state) => ({
      ...state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Items);
