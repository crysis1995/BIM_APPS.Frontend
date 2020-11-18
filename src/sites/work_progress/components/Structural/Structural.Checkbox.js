import React from 'react';
import { connect } from 'react-redux';
import { handleSelectedElements } from '../../redux/actions/upgrading_actions';

function Checkbox({ id, selected, handleSelectedElements }) {
	console.log(id, selected);
	return <input type="checkbox" checked={false} onChange={() => handleSelectedElements(id)} />;
}

const mapStateToProps = ({ Odbiory }) => ({
	selected: Odbiory.Upgrading.MONOLITHIC.selectedElements,
});

const mapDispatchToProps = {
	handleSelectedElements,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);
