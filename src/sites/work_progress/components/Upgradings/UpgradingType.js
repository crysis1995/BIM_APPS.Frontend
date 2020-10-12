import React from 'react';

import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeUpgradingByType } from '../../redux/actions/odbiory_actions';
import { UPGRADING_BY } from '../../redux/types/constans';

function UpgradingType({ changeUpgradingByType, upgrading_by }) {
	return (
		<Form.Row className="mt-3 d-flex flex-row">
			<Form.Check
				custom
				inline
				label="Awansuj wg pomieszczeń"
				id={UPGRADING_BY.ROOMS}
				checked={upgrading_by === UPGRADING_BY.ROOMS}
				onChange={(e) => changeUpgradingByType(e.target.id)}
				type={'radio'}
			/>
			<Form.Check
				custom
				inline
				label="Awansuj wg oddziałów"
				id={UPGRADING_BY.DEPARTMENT}
				checked={upgrading_by === UPGRADING_BY.DEPARTMENT}
				onChange={(e) => changeUpgradingByType(e.target.id)}
				type={'radio'}
			/>
		</Form.Row>
	);
}
const mapStateToProps = ({ Odbiory }) => ({
	upgrading_by: Odbiory.OdbioryComponent.awansowanie.by,
});

const mapDispatchToProps = {
	changeUpgradingByType,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpgradingType);
