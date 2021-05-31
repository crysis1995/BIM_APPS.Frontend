import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import arraySupport from 'dayjs/plugin/arraySupport';
import localeData from 'dayjs/plugin/localeData';
import isToday from 'dayjs/plugin/isToday';
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { connect } from 'react-redux';
import './table.css';
import Loader from '../../../../components/Loader';
import { RootState } from '../../redux/work_time_evidence/crew/epics';
import SelectorComponents from './SelectorComponents';
import RaportGeneratorsComponent from './RaportGenerators';
import WorkerCrewActionsTab from './WorkerCrewActionsTab';
import TimeEvidenceTable from './TimeEvidenceTable';

dayjs.extend(arraySupport);
dayjs.extend(localeData);
dayjs.locale('pl');
dayjs.extend(isToday);
/*
 *   TODO - integracja z kalendarzem wolnego wg WARBUDSA
 * */

const mapStateToProps = (state: RootState) => ({
	loading:
		state.WorkersLog.WorkTimeEvidence.Crews.loading_summary ||
		state.WorkersLog.WorkTimeEvidence.Crews.loading ||
		state.WorkersLog.WorkTimeEvidence.Workers.loading ||
		state.WorkersLog.WorkTimeEvidence.Workers.loading_map ||
		state.WorkersLog.WorkTimeEvidence.Workers.loading_workers ||
		state.WorkersLog.WorkTimeEvidence.TimeEvidence.loading,
});
const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function WorkTimeEvidenceComponent(props: Props) {
	// const [workerInit, addWorkerInit] = useState(false);
	useEffect(() => {
		return () => {
			console.log('WorkTimeEvidenceComponent - unmount');
		};
	}, []);
	return (
		<>
			<Col className={'p-3'}>
				<Row className="pb-3" noGutters={true}>
					<SelectorComponents />
					<RaportGeneratorsComponent />
				</Row>

				{props.loading ? (
					<Loader height={'400px'} />
				) : (
					<>
						<WorkerCrewActionsTab />
						<TimeEvidenceTable />
					</>
				)}
			</Col>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkTimeEvidenceComponent);
