import React from 'react';
// import { selectedItemsParamsSummary } from '../../Structural.Results.Selector';
//
// const mapStateToProps = (state: {}) => ({
// 	// @ts-ignore
// 	// selectedItemsParamsSummary: selectedItemsParamsSummary(state, undefined, { isFiltered: false }),
// 	// @ts-ignore
// 	selectedElements: state.Odbiory.Upgrading.MONOLITHIC.selectedElements,
// 	// @ts-ignore
// 	rotation_day: state.Odbiory.OdbioryComponent.MONOLITHIC.rotation_day,
// 	// @ts-ignore
// 	statuses_options: Object.values(state.Odbiory.OdbioryComponent.MONOLITHIC.statuses),
// });
// const mapDispatchToProps = {
// 	initSetStatus,
// };
// type Props = ReturnType<typeof mapStateToProps> &
// 	typeof mapDispatchToProps & { show: boolean; setShow: (v: boolean) => void };
//
// function SetStatusModal(props: Props) {
// 	const [status, setStatus] = useState('');
// 	const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
//
// 	const handleCloseModal = () => {
// 		props.setShow(false);
// 		setStatus('');
// 		setDate(dayjs().format('YYYY-MM-DD'));
// 	};
//
// 	const handleSubmit = () => {
// 		if (status) {
// 			props.initSetStatus(props.selectedElements, status, props.rotation_day, dayjs(date).toISOString());
// 			props.setShow(false);
// 		}
// 	};
// 	return (
// 		<Modal show={props.show} onClose={handleCloseModal} backdrop={true} keyboard={false} centered>
// 			<Modal.Header>
// 				<Modal.Title>Awansowanie</Modal.Title>
// 			</Modal.Header>
// 			<Modal.Body>
// 				<Row>
// 					<Col>
// 						<h5>
// 							Wybrano {props.selectedElements.length} element
// 							{props.selectedElements.length === 0 || props.selectedElements.length >= 5
// 								? 'ów'
// 								: props.selectedElements.length > 1 && props.selectedElements.length < 5
// 								? 'y'
// 								: ''}
// 						</h5>
// 					</Col>
// 				</Row>
// 				{props.selectedElements.length > 0 && (
// 					<Row>
// 						<Col>
// 							<Row>
// 								{Object.keys(props.selectedItemsParamsSummary).map((key) => (
// 									<Col className="py-3" xs={6} key={v4()}>
// 										<h6>{key}</h6>
// 										{Object.keys(props.selectedItemsParamsSummary[key]).map((e) => (
// 											<div key={v4()} className="">
// 												{/*@ts-ignore*/}
// 												<span className="mr-3">{MONOLITHIC.PARAMETERS[e]}</span>
// 												{'volume' === e ? (
// 													<UNITS.M3 precision={2}>
// 														{props.selectedItemsParamsSummary[key][e]}
// 													</UNITS.M3>
// 												) : 'area' === e ? (
// 													<UNITS.M2 precision={2}>
// 														{props.selectedItemsParamsSummary[key][e]}
// 													</UNITS.M2>
// 												) : 'running_meter' === e ? (
// 													<UNITS.CM precision={2}>
// 														{props.selectedItemsParamsSummary[key][e]}
// 													</UNITS.CM>
// 												) : null}
// 											</div>
// 										))}
// 									</Col>
// 								))}
// 							</Row>
// 							<hr />
// 							<Row>
// 								<Col xs={6}>
// 									<Selector
// 										classname={''}
// 										isDisabled={false}
// 										label={'Ustaw status elementów'}
// 										options={props.statuses_options.map((e) => ({
// 											/* @ts-ignore*/
// 											id: e.name,
// 											/* @ts-ignore*/
// 											name: MONOLITHIC.STATUS[e.name].name,
// 										}))}
// 										value={status}
// 										/* @ts-ignore*/
// 										onChangeValue={(e) => setStatus(e)}
// 									/>
// 								</Col>
// 								<Col xs={6}>
// 									<Form.Label>Wykonano w dniu</Form.Label>
// 									<Form.Control
// 										size={'sm'}
// 										type={'date'}
// 										value={date}
// 										onChange={(e) => setDate(dayjs(e.target.value).format('YYYY-MM-DD'))}
// 									/>
// 								</Col>
// 							</Row>
// 						</Col>
// 					</Row>
// 				)}
// 			</Modal.Body>
// 			<Modal.Footer>
// 				<Button variant="secondary" onClick={handleCloseModal}>
// 					Zamknij
// 				</Button>
// 				<Button variant="success" onClick={handleSubmit}>
// 					Zapisz
// 				</Button>
// 			</Modal.Footer>
// 		</Modal>
// 	);
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(SetStatusModal);
