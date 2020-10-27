import React from 'react';
import { connect } from 'react-redux';
import StructuralComponent from '../Structural';

// const WEEK_DAYS_NUMBER = 7;
// const changeDate = (date, increase = true) => {
// 	let increaseDays;
// 	date = new Date(date);
// 	const weekDay = date.getDay();
// 	if (increase) {
// 		increaseDays = 1;
// 		if (weekDay > 4) {
// 			increaseDays += WEEK_DAYS_NUMBER - weekDay;
// 		}
// 	} else {
// 		increaseDays = -1;
// 		if (weekDay < 2) {
// 			increaseDays += -1 - weekDay;
// 		}
// 	}
// 	return dateFormatter(date.setDate(date.getDate() + increaseDays));
// };

// const dateFormatter = (date) => {
// 	let newDate = new Date(date);
// 	return `${newDate.getFullYear()}-${
// 		newDate.getMonth() + 1 < 10 ? '0' + String(newDate.getMonth() + 1) : newDate.getMonth() + 1
// 	}-${newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()}`;
// };

function Structural(props) {
	return (
		<div className="d-flex flex-column w-100">
			<StructuralComponent.Inputs />
			<StructuralComponent.Results />
		</div>
	);
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Structural);
