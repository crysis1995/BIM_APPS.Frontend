import React from 'react';
import { connect } from 'react-redux';

function ShowParameters(props) {
	return <div className="p-3">Test ustawiania widoczności parametrów</div>;
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ShowParameters);
