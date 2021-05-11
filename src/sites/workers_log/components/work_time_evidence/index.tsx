import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import arraySupport from 'dayjs/plugin/arraySupport';
import localeData from 'dayjs/plugin/localeData';
import isToday from 'dayjs/plugin/isToday';
import React, { useEffect, useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { connect } from 'react-redux';
import WorkerTypeSelector from './SelectorComponents/WorkerTypeSelector';
import CrewSelectorComponent from './SelectorComponents/CrewSelectorComponent';
import MonthsSelectorComponent from './SelectorComponents/MonthsSelectorComponent';
import AddWorkerComponent from './EditCrewSquad/AddWorkerComponent';
import WorkersListComponents from './ViewComponents/WorkersListComponent';
import HeadersComponent from './ViewComponents/HeadersComponent';
import './table.css';
import RaportGenerators from './RaportGenerators';
import Loader from '../../../../components/Loader';
import { RootState } from '../../redux/work_time_evidence/crew/epics';
import DeleteWorkerComponent from './EditCrewSquad/DeleteWorkerComponent';
import CopyCrewComponent from './EditCrewSquad/CopyCrewComponent';

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
	const [workerInit, addWorkerInit] = useState(false);
	useEffect(() => {
		return () => {
			console.log('WorkTimeEvidenceComponent - unmount');
		};
	}, []);
	return (
		<>
			<Col className={'p-3'}>
				<Row className="pb-3" noGutters={true}>
					<WorkerTypeSelector />
					<CrewSelectorComponent />
					<MonthsSelectorComponent />
					<RaportGenerators />
				</Row>

				{props.loading ? (
					<Loader height={'400px'} />
				) : (
					<>
						<Row noGutters={true} className="border-top border-bottom">
							<Col>
								<AddWorkerComponent />
								<DeleteWorkerComponent />
								<CopyCrewComponent />
							</Col>
						</Row>
						<Row noGutters={true}>
							<Table size={'sm'} className={'work-time-evidence-table'} id={'printable-report-area'}>
								<HeadersComponent />
								<tbody>
									<WorkersListComponents />
								</tbody>
							</Table>
						</Row>
					</>
				)}
			</Col>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkTimeEvidenceComponent);
