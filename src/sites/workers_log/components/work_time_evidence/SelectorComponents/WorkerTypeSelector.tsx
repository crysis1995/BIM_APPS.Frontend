import { Col, Form } from 'react-bootstrap';
import React from 'react';
import { connect } from 'react-redux';
import { PL_DICTIONARY, WORKER_TYPES } from '../../../redux/constants';
import GeneralActions from '../../../redux/work_time_evidence/general/actions';
import { RootState } from '../../../../../store';

const mapStateToProps = (state: RootState) => ({
	worker_type: state.WorkersLog.WorkTimeEvidence.General.worker_type,
});
const mapDispatchToProps = { selectWorkerType: GeneralActions.selectWorkerType };

type WorkerTypeSelectorProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function WorkerTypeSelector(props: WorkerTypeSelectorProps) {
	const WorkerTypeElem = Object.keys(WORKER_TYPES) as (keyof typeof WORKER_TYPES)[];
	const options = WorkerTypeElem.map((workerType) => ({
		id: WORKER_TYPES[workerType],
		name: PL_DICTIONARY[WORKER_TYPES[workerType]],
	}));

	return (
		<Col xs={'auto'}>
			<Form.Label>Typ brygady</Form.Label>
			<Form.Control
				data-testid={'Selector'}
				onChange={(event) => {
					const data: WORKER_TYPES = event.target.value as WORKER_TYPES;
					props.selectWorkerType(data);
				}}
				as="select"
				value={props.worker_type ? props.worker_type : ''}
				size={'sm'}>
				<option value="">Wybierz...</option>
				{options.map((e) => (
					<option data-testid="options" key={e.id} value={e.id}>
						{e.name}
					</option>
				))}
			</Form.Control>
		</Col>
	);
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(WorkerTypeSelector);
