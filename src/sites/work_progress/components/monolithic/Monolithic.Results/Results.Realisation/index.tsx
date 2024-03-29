import React, { useState } from 'react';
import { Button, Col } from 'react-bootstrap';
import SetStatusModal from './SetStatus.Modal';
import { RootState } from '../../../../../../store';
import ObjectsTable from '../Components/ObjectsTable';
import { connect } from 'react-redux';

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function ResultsRealisation(props: Props) {
	const [showModal, setShowModal] = useState(false);
	const variant = 'light';
	return (
		<>
			<Col xs={12} className={'d-flex justify-content-between'}>
				<Button className={'float-right'} variant={'success'} onClick={() => setShowModal(true)}>
					<svg
						width="1em"
						height="1em"
						viewBox="0 0 16 16"
						className="bi bi-card-checklist"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
						/>
						<path
							fillRule="evenodd"
							d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"
						/>
					</svg>
					{'  '}
					Awansuj wybrane
				</Button>
			</Col>
			<Col xs={12} className="h-100" style={{ overflowY: 'auto', maxHeight: 500 }}>
				<ObjectsTable allowSelection={true} showStatuses={true} />
			</Col>
			<SetStatusModal setShow={setShowModal} show={showModal} />
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsRealisation);
