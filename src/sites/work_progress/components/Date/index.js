import React from 'react';
import { connect } from 'react-redux';

function DateComponent(props) {
	return <div>Date Component</div>;
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DateComponent);
