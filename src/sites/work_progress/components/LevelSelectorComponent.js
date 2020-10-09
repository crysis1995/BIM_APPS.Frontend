import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import { setCurrentSheet } from '../../../components/ForgeViewer/redux/actions';

// import { setCurrentSheet } from '../redux/actions/levels_actions';

function LevelSelectorComponent(props) {
	return (
		<Form.Row>
			<Col className="mb-3">
				<Form.Label>Kondygnacja</Form.Label>
				<Form.Control
					onChange={(event) => {
						props.setCurrentSheet(event.target.value);
					}}
					disabled={props.objects_jobs_loading}
					as="select"
					value={props.current_sheet}
					custom>
					<option value="">Wybierz...</option>
					{props.sheets_loaded &&
						props.sheets.map((e) => (
							<option key={v4()} value={e.index}>
								{e.name}
							</option>
						))}
				</Form.Control>
			</Col>
		</Form.Row>
	);
}

const mapStateToProps = ({ Odbiory, ForgeViewer }) => ({
	objects_jobs_loading: Odbiory.Jobs.objects_jobs_loading,
	current_sheet: ForgeViewer.current_sheet,
	sheets_loaded: ForgeViewer.sheets_loaded,
	sheets: ForgeViewer.sheets,
});

const mapDispatchToProps = {
	setCurrentSheet,
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelSelectorComponent);
