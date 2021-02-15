import React from 'react';
import { connect } from 'react-redux';

function WorkersLog(props) {
	console.log(props);
	return <div className="p-5">Dziennik brygadzistowski</div>;
}

export default connect(null, null)(WorkersLog);
