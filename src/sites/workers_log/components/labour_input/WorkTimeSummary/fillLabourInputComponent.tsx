import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import FillLabourInputModal from '../Modal/FillLabourModal';
import { connect } from 'react-redux';
import { RootState } from '../../../../../state';

const mapStateToProps = (state: RootState) => ({
	disabled: state.WorkersLog.LabourInput.Objects.Selection.length === 0,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function FillLabourInputComponent(props: Props) {
	const [show, setShow] = useState(false);
	const showModal = () => {
		setShow(true);
	};
	return (
		<>
			<Button
				// disabled={props.disabled}
				onClick={showModal}>
				Wypełnij nakład pracy
			</Button>
			<FillLabourInputModal show={show} setShow={setShow} />
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(FillLabourInputComponent);
