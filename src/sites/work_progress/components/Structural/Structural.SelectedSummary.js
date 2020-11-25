import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import UNITS from '../../../../components/Units';
import { MONOLITHIC } from '../../redux/types/constans';
import { selectedItemsParamsSummary } from './Structural.Results.Selector';


function SelectedSummary({ selectedItemsParamsSummary, selectedElements_length }) {
	if (selectedElements_length === 0) return null;
	else
		return (
			<Col
				style={{ overflowY: 'auto', maxHeight: 200, minHeight: 200 }}
				className={'pt-3 d-flex flex-row border-top'}>
				{Object.keys(selectedItemsParamsSummary).map((key) => (
					<Col xs={3} key={v4()}>
						<h3>{key}</h3>
						{Object.keys(selectedItemsParamsSummary[key]).map((e) => (
							<div key={v4()} className="font-weight-bold">
								<span className="mr-3">{MONOLITHIC.PARAMETERS[e]}</span>
								{'Volume' === e ? (
									<UNITS.M3>{selectedItemsParamsSummary[key][e]}</UNITS.M3>
								) : 'Area' === e ? (
									<UNITS.M2>{selectedItemsParamsSummary[key][e]}</UNITS.M2>
								) : 'Length' === e ? (
									<UNITS.CM>{selectedItemsParamsSummary[key][e]}</UNITS.CM>
								) : null}
							</div>
						))}
					</Col>
				))}
			</Col>
		);
}

const mapStateToProps = (state) => ({
	selectedItemsParamsSummary: selectedItemsParamsSummary(state, undefined, { isFiltered: true }),
	selectedElements_length: state.Odbiory.Upgrading.MONOLITHIC.selectedElements.length,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedSummary);
