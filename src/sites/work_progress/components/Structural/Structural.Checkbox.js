import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { handleSelectedElements } from '../../redux/actions/upgrading_actions';
import { selectedItems } from './Structural.Results.Selector';

function Checkbox({ id, isSelected, handleSelectedElements }) {
	return <input type="checkbox" checked={isSelected} onChange={() => handleSelectedElements(id)} />;
}

const mapStateToProps = (state, props) => ({
	isSelected: selectedItems(state, props),
});

const mapDispatchToProps = {
	handleSelectedElements,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkbox);
