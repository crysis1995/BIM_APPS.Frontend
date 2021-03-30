import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import arraySupport from 'dayjs/plugin/arraySupport';
import localeData from 'dayjs/plugin/localeData';
import isToday from 'dayjs/plugin/isToday';
import React, { useState } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { connect } from 'react-redux';
import { CrewState } from '../../redux/work_time_evidence/crew/types/state';
import { WorkersState } from '../../redux/work_time_evidence/worker/types/state';
import WorkerTypeSelector from './SelectorComponents/WorkerTypeSelector';
import CrewSelectorComponent from './SelectorComponents/CrewSelectorComponent';
import MonthsSelectorComponent from './SelectorComponents/MonthsSelectorComponent';
import AddWorkerComponent from './AddWorkerComponent';
import RaportGeneratorButton from './RaportGeneratorButton';
import WorkersListComponents from './ViewComponents/WorkersListComponent';
import HeadersComponent from './ViewComponents/HeadersComponent';
import './table.css';

dayjs.extend(arraySupport);
dayjs.extend(localeData);
dayjs.locale('pl');
dayjs.extend(isToday);
/*
 *   TODO - integracja z kalendarzem wolnego wg WARBUDSA
 * */

const mapStateToProps = (state: {
	WorkersLog: { WorkTimeEvidence: { Crews: CrewState; Workers: WorkersState } };
}) => ({});
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
					<RaportGeneratorButton />
				</Row>
				<Row noGutters={true} className="border-top">
					<Table size={'sm'} hover={true} borderless={true}>
						<HeadersComponent addWorkerInit={addWorkerInit} workerInit={workerInit} />
						<tbody>
							<WorkersListComponents />
						</tbody>
						<footer>
							<AddWorkerComponent show={workerInit} />
						</footer>
					</Table>
				</Row>
			</Col>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkTimeEvidence);
