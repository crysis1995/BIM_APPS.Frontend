import React from 'react';
import { connect } from 'react-redux';

function SetStatus(props) {
	return <div className="p-3">Test awansowania</div>;
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SetStatus);
