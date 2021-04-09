import React, { useEffect, useState } from 'react';
import GraphQLAPIService from '../../../../../services/graphql.api.service';
import { connect } from 'react-redux';
import { initCreateNewDelay } from '../../../redux/actions/delays_actions';
import Loader from '../../../../../components/Loader';
import { DelayCauseResponse } from './DelayCauseResponse';
import { v4 } from 'uuid';
import dayjs from 'dayjs';
import { Card, Col, Row } from 'react-bootstrap';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { FilterBy, FilterByOneOrRange } from './FilterByOneOrRange';
import { getDateRangeFromData } from './GetDateRangeFromData';
import GenerateExcelRaportButton from './GenerateExcelRaportButton';

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const mapStateToProps = (state: {
	Odbiory: { Delays: { MONOLITHIC: { delay_causes_all: { [key: string]: { id: number; name: string } } } } };
}) => ({
	all_delays: state.Odbiory.Delays.MONOLITHIC.delay_causes_all,
});

const mapDispatchToProps = { initCreateNewDelay };

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function ListDelay(props: Props) {
	const [loading, setLoading] = useState<boolean>(false);
	const [delayCauses, setDaleyCauses] = useState<DelayCauseResponse[]>([]);
	const [filteredDelayCauses, setFilteredDelayCauses] = useState<DelayCauseResponse[]>([]);

	const [startSetDay, setStartSetDay] = useState(dayjs().format('YYYY-MM-DD'));
	const [endSetDay, setEndSetDay] = useState(dayjs().format('YYYY-MM-DD'));

	const [dateFilterValues, setDateFilterValues] = useState<string>(dayjs().format('YYYY-MM-DD'));
	const [dateFilterRangeValues, setDateFilterRangeValues] = useState<{ start: string; end: string }>({
		start: startSetDay,
		end: endSetDay,
	});
	const [choosedBy, setChoosedBy] = useState(FilterBy.Range);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const data: DelayCauseResponse[] = await new GraphQLAPIService().MONOLITHIC.getDelays();
			setDaleyCauses(data);
			const { start, end } = getDateRangeFromData(data);
			choosedBy === FilterBy.Range &&
				setDateFilterRangeValues({ start: start.format('YYYY-MM-DD'), end: end.format('YYYY-MM-DD') });
			setStartSetDay(start.format('YYYY-MM-DD'));
			setEndSetDay(end.format('YYYY-MM-DD'));
			setLoading(false);
		};

		fetchData();
	}, []);

	useEffect(() => {
		const filtered = delayCauses.filter((byDate) => {
			if (choosedBy === FilterBy.Range)
				return dayjs(byDate.date || byDate.created_at).isBetween(
					dayjs(dateFilterRangeValues.start),
					dayjs(dateFilterRangeValues.end),
					null,
					'[]',
				);
			else return dayjs(byDate.date || byDate.created_at).isSame(dayjs(dateFilterValues), 'day');
		});
		setFilteredDelayCauses(filtered);
	}, [dateFilterValues, dateFilterRangeValues.start, dateFilterRangeValues.end, choosedBy]);

	if (loading)
		return (
			<Col>
				<Loader height={'100px'} />
			</Col>
		);
	return (
		<>
			<Col xs={4} className="p-3">
				<div className="w-100">
					<GenerateExcelRaportButton filteredDelayCauses={filteredDelayCauses} />
				</div>
				<hr />
				<div className="w-100">
					<FilterByOneOrRange
						setDateFilterValues={setDateFilterValues}
						dateFilterValues={dateFilterValues}
						setDateFilterRangeValues={setDateFilterRangeValues}
						initialStartDate={startSetDay}
						initialEndDate={endSetDay}
						choosedBy={choosedBy}
						setChoosedBy={setChoosedBy}
					/>
				</div>
				<hr />
			</Col>
			<Col
				xs={8}
				className="h-100 p-3"
				style={{ overflowY: 'auto', maxHeight: window.innerHeight - 56 - 87 - 40 - 16 * 2 }}>
				{filteredDelayCauses.map((e) => (
					<Card key={v4()} className="w-100 mb-3">
						<Card.Body as={Row}>
							<Col xs={12} className="pb-1 mb-1">
								<div className="d-flex flex-row justify-content-between">
									<div>
										<a href={''} onClick={(e) => e.preventDefault()}>
											<h5>Id zgłoszenia: {e.id}</h5>
										</a>
										<p className="m-0">
											<small className="text-muted">Autor: {e.user.email}</small>
										</p>
									</div>
									<div>
										<small>{e.date && dayjs(e.date).format('YYYY-MM-DD')}</small>
									</div>
								</div>
							</Col>
							<Col className="border-right">
								<p className="mb-2">
									<strong>Powody opóźnienia</strong>
								</p>
								<ul className="ml-0 pl-3">
									{e.causes.map((value) => (
										<li key={v4()}>
											<small>{props.all_delays[value.id].name}</small>
										</li>
									))}
								</ul>
							</Col>
							<Col>
								<p className="mb-2">
									<strong>Komentarz</strong>
								</p>
								<p>
									<small>{e.commentary}</small>
								</p>
							</Col>
						</Card.Body>
					</Card>
				))}
			</Col>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDelay);
