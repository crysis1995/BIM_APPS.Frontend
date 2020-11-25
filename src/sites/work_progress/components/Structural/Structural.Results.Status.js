import React from 'react';
import { Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MONOLITHIC } from '../../redux/types/constans';
import { ElementStatusSelector } from './Structural.Results.Selector';

function Status({ status }) {
	return (
		<Badge className={'p-1 small'} style={{ backgroundColor: status.color, color: '#ffffff' }}>
			{status.name}
		</Badge>
	);
}

const mapStateToProps = (state, { revit_id }) => ({
	status: ElementStatusSelector(state, revit_id),
});

// const mapDispatchToProps = {};

export default connect(mapStateToProps, null)(Status);
