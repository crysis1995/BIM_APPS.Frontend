import { Col, Form } from 'react-bootstrap';
import React from 'react';
import { connect } from 'react-redux';
import { PL_DICTIONARY } from '../../../redux/constants';
import GeneralActions from '../../../redux/work_time_evidence/general/actions';

import { WORKERS_LOG__WORKERS_TYPE } from '../../../../../services/graphql.api.service/CONSTANTS/GeneralTypes';
import { RootState } from '../../../../../state';

const mapStateToProps = (state: RootState) => ({
	worker_type: state.WorkersLog.WorkTimeEvidence.General.worker_type,
});
const mapDispatchToProps = { selectWorkerType: GeneralActions.selectWorkerType };

type WorkerTypeSelectorProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function WorkerTypeSelector(props: WorkerTypeSelectorProps) {
	const WorkerTypeElem = Object.keys(WORKERS_LOG__WORKERS_TYPE) as (keyof typeof WORKERS_LOG__WORKERS_TYPE)[];
	const options = WorkerTypeElem.map((workerType) => ({
		id: WORKERS_LOG__WORKERS_TYPE[workerType],
		name: PL_DICTIONARY[WORKERS_LOG__WORKERS_TYPE[workerType]],
	}));

	return (
		<Col xs={'auto'}>
			<Form.Label>Typ brygady</Form.Label>
			<Form.Control
				data-testid={'Selector'}
				onChange={(event) => {
					const data: WORKERS_LOG__WORKERS_TYPE = event.target.value as WORKERS_LOG__WORKERS_TYPE;
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

export default connect(mapStateToProps, mapDispatchToProps)(WorkerTypeSelector);
