import React from 'react';
import { connect } from 'react-redux';
import LabourInputGeneralActions from '../../../redux/labour_input/general/actions';
import { RootState } from '../../../../../state';
import { Form } from 'react-bootstrap';
import { v4 } from 'uuid';

const mapStateToProps = (state: RootState) => ({
	loading: state.CMSLogin.loading,
	levels: state.CMSLogin.actual_project?.levels_all,
	ActiveLevel: state.WorkersLog.LabourInput.General.ActiveLevel,
});

const mapDispatchToProps = {
	ChooseLevel: LabourInputGeneralActions.ChooseLevel,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function LevelSelectorComponent(props: Props) {
	return (
		<>
			<Form.Label>Kondygnacja</Form.Label>
			<Form.Control
				disabled={props.loading || !props.levels}
				as="select"
				size={'sm'}
				value={props.ActiveLevel?.id ?? ''}
				onChange={(e) => props.levels && props.ChooseLevel(props.levels[e.target.value])}>
				<option key={v4()} value={''}>
					Wybierz...
				</option>
				{(props.levels ? Object.values(props.levels) : []).map((opt) => (
					<option key={v4()} value={opt.id}>
						{opt.name}
					</option>
				))}
			</Form.Control>
		</>
		// <Selector
		// 	classname={''}
		// 	label={'Kondygnacja'}
		// 	isDisabled={props.loading || !props.levels}
		// 	value={props.ActiveLevel?.id}
		// 	options={props.levels ? Object.values(props.levels) : []}
		// 	onChangeValue={(id: string) => props.levels && props.ChooseLevel(props.levels[id])}
		// />
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelSelectorComponent);
