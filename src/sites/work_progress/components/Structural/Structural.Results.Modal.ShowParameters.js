import React from 'react';
import { connect } from 'react-redux';

function ShowParameters({ prop }) {
	return (
		<div className="p-3">

		</div>
	);
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShowParameters);
