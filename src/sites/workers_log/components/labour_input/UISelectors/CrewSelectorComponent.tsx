import React, { useEffect, useState } from 'react';
import { CMSLoginType } from '../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../redux';
import { connect } from 'react-redux';
import LabourInputGeneralActions from '../../../redux/labour_input/general/actions';
import { Form } from 'react-bootstrap';
import { v4 } from 'uuid';

const mapStateToProps = (state: {
	CMSLogin: CMSLoginType.Redux.Store;
	WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
}) => ({
	ActualCrew: state.WorkersLog.LabourInput.General.ActualCrew,
	AllCrews: state.WorkersLog.General.all_crews,
	ActiveWorkType: state.WorkersLog.LabourInput.General.ActiveWorkType,
});

const mapDispatchToProps = {
	SelectCrew: LabourInputGeneralActions.SelectCrew,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function CrewTypeSelectorComponent(props: Props) {
	const [crews, setCrews] = useState<{ id: string; name: string }[]>([]);
	useEffect(() => {
		if (props.AllCrews) {
			const filteredCrews = Object.values(props.AllCrews)
				.filter((crew) => crew.workers_type === props.ActiveWorkType)
				.map(({ id, name }) => ({ id, name }));
			setCrews(filteredCrews);
		} else {
			setCrews([]);
		}
	}, [props.ActiveWorkType]);
	return (
		<>
			<Form.Label>Brygada</Form.Label>
			<Form.Control
				as="select"
				value={props.ActualCrew || ''}
				onChange={(e) => props.SelectCrew(e.target.value)}
				size={'sm'}>
				<option key={v4()} value={''}>Wybierz brygadę...</option>
				{crews.map((crew) => (
					<option key={v4()} value={crew.id}>{crew.name}</option>
				))}
			</Form.Control>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(CrewTypeSelectorComponent);
