import React from "react";
import { connect } from "react-redux";

function ResultComponent(props) {
    console.log("zamontowano");
    console.log(props.OdbioryComponent);
    return <div>Results</div>;
}
const mapStateToProps = ({ Odbiory, ForgeViewer }) => ({
    ...Odbiory,
    ForgeViewer: ForgeViewer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ResultComponent);
