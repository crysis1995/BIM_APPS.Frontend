import React, { useState } from 'react';
import { Alert, Button, Col, Fade, Form, ListGroup, Row, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import dayjs, { Dayjs } from 'dayjs';
import WorkProgressMonolithicDelaysActions from '../../../../redux/monolithic/delays/actions';
import Loader from '../../../../../../components/Loader';
import { RootState } from '../../../../../../store';
import WorkProgress from '../../../../types';

const baseMargin = 25;

const mapStateToProps = (state: RootState) => ({
	active_level: state.WorkProgress.Monolithic.General.active_level,
	delay_causes_loading: state.WorkProgress.Monolithic.Delays.delay_causes_loading,
	delay_causes: state.WorkProgress.Monolithic.Delays.delay_causes || [],
});

const mapDispatchToProps = { InitCreateNew: WorkProgressMonolithicDelaysActions.InitCreateNew };

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function ResultsDelayCreate({ InitCreateNew, delay_causes_loading, delay_causes, active_level }: Props) {
	const [date, setDate] = useState<Dayjs>(dayjs());
	const [comment, setComment] = useState<string>('');
	const [message, setMessage] = useState<string>('');
	const [causes, setCauses] = useState<string[]>([]);
	const [error, setError] = useState<{ comment?: string; causes?: string }>({});

	if (!active_level) return null;
	if (delay_causes_loading) return <Loader />;

	function ChildCheck({
		object,
		margin,
	}: {
		object: WorkProgress.Monolithic.Delays.Payload.DelaysTreeOutput;
		margin: number;
	}) {
		if (object.hasOwnProperty('children')) {
			return (
				<>
					<Form.Check
						style={{ marginLeft: margin }}
						type="checkbox"
						onChange={(e) =>
							setCauses((prevState) => {
								if (causes.length < 1)
									setError((data) => ({ ...data, causes: 'Wybierz co najmniej jeden powód!' }));
								else
									setError((data) => {
										delete data.comment;
										return data;
									});
								if (causes.length > 3)
									setError((data) => ({
										...data,
										causes: 'Możesz wybrać tylko trzy przyczyny opóźnienia!',
									}));
								else
									setError((data) => {
										delete data.causes;
										return data;
									});
								return prevState.includes(object.id)
									? prevState.filter((e) => e !== object.id)
									: prevState.length < 3
									? [...prevState, object.id]
									: prevState;
							})
						}
						checked={causes.includes(object.id)}
						label={<small>{object.label}</small>}
					/>
					{object.children?.map((child) => (
						<ChildCheck key={v4()} object={child} margin={margin + baseMargin} />
					))}
				</>
			);
		} else {
			return (
				<Form.Check
					onChange={(e) =>
						setCauses((prevState) => {
							if (causes.length < 1)
								setError((data) => ({ ...data, causes: 'Wybierz co najmniej jeden powód!' }));
							else
								setError((data) => {
									delete data.comment;
									return data;
								});
							if (causes.length > 3)
								setError((data) => ({
									...data,
									causes: 'Możesz wybrać tylko trzy przyczyny opóźnienia!',
								}));
							else
								setError((data) => {
									delete data.causes;
									return data;
								});
							return prevState.includes(object.id)
								? prevState.filter((e) => e !== object.id)
								: prevState.length < 3
								? [...prevState, object.id]
								: prevState;
						})
					}
					checked={causes.includes(object.id)}
					style={{ marginLeft: margin }}
					type="checkbox"
					label={<small>{object.label}</small>}
				/>
			);
		}
	}

	const submit = () => {
		if (!error.comment && !error.causes) {
			InitCreateNew({
				level_id: active_level,
				selected_cases: causes,
				commentary: comment,
				date: date.format('YYYY-MM-DD'),
			});
			setDate(dayjs());
			setComment('');
			setCauses([]);
			setError({});
			setMessage('Dodano zgłoszenie!');
			setTimeout(() => setMessage(''), 3000);
		}
	};
	return (
		<Col xs={12} className="h-100">
			<div className={'pt-4 text-center'}>
				<h6>Określ przyczynę opóźnień (min. 1 | maks. 3)</h6>
			</div>
			<hr />
			{message && (
				<Alert transition={Fade} variant={'success'}>
					{message}
				</Alert>
			)}
			<Tab.Container id="list-group-tabs-example">
				<Row>
					<Col sm={4}>
						<ListGroup variant={'flush'}>
							{delay_causes.map((obj, index) => (
								<ListGroup.Item
									key={index}
									className={'btn-sm p-2 m-0'}
									action
									eventKey={index.toString()}>
									{obj.label}
								</ListGroup.Item>
							))}
						</ListGroup>
					</Col>
					<Col sm={8}>
						<Tab.Content>
							{delay_causes.map((obj, index) => (
								<Tab.Pane key={index} eventKey={index}>
									<ChildCheck object={obj} margin={0} />
								</Tab.Pane>
							))}
						</Tab.Content>
					</Col>
				</Row>
			</Tab.Container>
			<hr />
			<Row>
				<Col xs={8}>
					<Form.Label>Komentarz</Form.Label>
					<Form.Control
						as="textarea"
						rows={2}
						isInvalid={!!error.comment}
						onChange={(event) => {
							event.target.value.length > 250 &&
								setError((error) => ({ ...error, comment: 'Komentarz jest za długi!' }));
							setComment(event.target.value);
						}}
						value={comment}
					/>
				</Col>
				<Col xs={4}>
					<Form.Label>Wybierz datę wystąpienia opóźnienia</Form.Label>
					<Form.Control
						size={'sm'}
						type="date"
						onChange={(event) => {
							setDate(dayjs(event.target.value));
						}}
						value={date.format('YYYY-MM-DD')}
					/>
				</Col>
			</Row>
			<hr />
			<Row>
				<Col xs={'auto'}>
					<Button type={'submit'} onClick={submit} variant={'success'}>
						Zapisz!
					</Button>
				</Col>
			</Row>
		</Col>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsDelayCreate);
