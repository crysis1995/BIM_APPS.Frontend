import React from 'react';
import { Badge } from 'react-bootstrap';
import { connect } from 'react-redux';
import { notify } from 'reapop';
import { MONOLITHIC } from '../../redux/types/constans';
import { ElementStatusSelector } from './Structural.Results.Selector';

function Status({ status, click }) {
	return (
		<Badge
			className={'p-1 small'}
			onClick={() => click()}
			style={{ backgroundColor: status.color, color: '#ffffff' }}>
			{status.name}
		</Badge>
	);
}

const mapStateToProps = (state, { revit_id }) => ({
	status: ElementStatusSelector(state, revit_id),
});

const mapDispatchToProps = (dispatch) => {
	return {
		click: () =>
			dispatch(
				notify('Uploading your file...', 'loading', {
					dismissible: false,
				}),
			),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Status);
