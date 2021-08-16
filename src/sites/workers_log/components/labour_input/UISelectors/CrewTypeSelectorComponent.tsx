import React from 'react';
import { CMSLoginType } from '../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../redux';
import { connect } from 'react-redux';
import LabourInputGeneralActions from '../../../redux/labour_input/general/actions';
import { Form } from 'react-bootstrap';
import { WORKERS_LOG__WORKERS_TYPE } from '../../../../../services/graphql.api.service/CONSTANTS/GeneralTypes';
import { PL_DICTIONARY, WORKER_TYPES } from '../../../redux/constants';
import { v4 } from 'uuid';

const mapStateToProps = (state: {
	CMSLogin: CMSLoginType.Redux.Store;
	WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
}) => ({
	ActiveWorkType: state.WorkersLog.LabourInput.General.ActiveWorkType,
});

const mapDispatchToProps = {
	SelectWorkerType: LabourInputGeneralActions.SelectWorkerType,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function CrewTypeSelectorComponent(props: Props) {
	const WorkerTypeElem = Object.keys(WORKER_TYPES) as (keyof typeof WORKER_TYPES)[];
	const options = WorkerTypeElem.map((workerType) => ({
		id: WORKER_TYPES[workerType],
		name: PL_DICTIONARY[WORKER_TYPES[workerType]],
	}));
	return (
		<>
			<Form.Label>Typ Brygady</Form.Label>
			<Form.Control
				as="select"
				size={'sm'}
				value={props.ActiveWorkType || ''}
				onChange={(e) => props.SelectWorkerType(e.target.value as WORKERS_LOG__WORKERS_TYPE)}>
				<option key={v4()} value={''}>
					Wybierz typ brygady...
				</option>
				{options.map((opt) => (
					<option key={v4()} value={opt.id}>
						{opt.name}
					</option>
				))}
			</Form.Control>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(CrewTypeSelectorComponent);
