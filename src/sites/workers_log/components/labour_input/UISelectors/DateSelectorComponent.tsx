import React from 'react';
import { connect } from 'react-redux';
import LabourInputGeneralActions from '../../../redux/labour_input/general/actions';
import { Form } from 'react-bootstrap';
import dayjs from 'dayjs';
import { RootState } from '../../../../../state';

const mapStateToProps = (state: RootState) => ({
	loading: state.CMSLogin.loading,
	levels: state.CMSLogin.actual_project?.levels_all,
	ActualDate: state.WorkersLog.LabourInput.General.ActualDate,
});

const mapDispatchToProps = {
	SetDate: LabourInputGeneralActions.SetDate,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function DateSelectorComponent(props: Props) {
	return (
		<>
			<Form.Label>Data</Form.Label>
			<Form.Control
				disabled={props.loading || !props.levels}
				size={'sm'}
				onChange={(selectedDay) => props.SetDate(dayjs(selectedDay.target.value))}
				value={props.ActualDate}
				type="date"
			/>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(DateSelectorComponent);
