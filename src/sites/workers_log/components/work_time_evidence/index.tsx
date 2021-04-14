import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import arraySupport from 'dayjs/plugin/arraySupport';
import localeData from 'dayjs/plugin/localeData';
import isToday from 'dayjs/plugin/isToday';
import React, { useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { connect } from 'react-redux';
import WorkerTypeSelector from './SelectorComponents/WorkerTypeSelector';
import CrewSelectorComponent from './SelectorComponents/CrewSelectorComponent';
import MonthsSelectorComponent from './SelectorComponents/MonthsSelectorComponent';
import AddWorkerComponent from './AddWorkerComponent';
import WorkersListComponents from './ViewComponents/WorkersListComponent';
import HeadersComponent from './ViewComponents/HeadersComponent';
import './table.css';
import RaportGenerators from './RaportGenerators';
import Loader from '../../../../components/Loader';
import { RootState } from '../../redux/work_time_evidence/crew/epics';

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

function WorkTimeEvidence(props: Props) {
	const [workerInit, addWorkerInit] = useState(false);
	return (
		<>
			<Col className={'p-3'}>
				<Row className="pb-3" noGutters={true}>
					<WorkerTypeSelector />
					<CrewSelectorComponent />
					<MonthsSelectorComponent />
					<RaportGenerators />
				</Row>
				<Row noGutters={true} className="border-top">
					{props.loading ? (
						<Col className={'justify-content-center p-5 m-5'}>
							<Loader height={'400'} />
						</Col>
					) : (
						<Table size={'sm'} bordered id={'printable-report-area'}>
							<HeadersComponent addWorkerInit={addWorkerInit} workerInit={workerInit} />
							<tbody>
								<WorkersListComponents />
							</tbody>
							<footer>
								<AddWorkerComponent show={workerInit} />
							</footer>
						</Table>
					)}
				</Row>
			</Col>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkTimeEvidence);
