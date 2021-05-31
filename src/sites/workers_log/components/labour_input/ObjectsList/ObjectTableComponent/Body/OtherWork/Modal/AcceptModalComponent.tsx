import { Button, Modal } from 'react-bootstrap';
import React from 'react';
import { connect } from 'react-redux';
import { CMSLoginType } from '../../../../../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../../../../../redux';
import LabourInputTimeEvidenceActions from '../../../../../../../redux/labour_input/time_evidence/actions';

type componentProps = { show: boolean; onCancel: () => void; onAccept: () => void; selectedID: string };

const mapStateToProps = (
	state: {
		CMSLogin: CMSLoginType.Redux.Store;
		WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
	},
	componentProps: componentProps,
) => ({
	otherWorksOptionName:
		state.WorkersLog.LabourInput.General.OtherWorks &&
		componentProps.selectedID &&
		state.WorkersLog.LabourInput.General.OtherWorks[componentProps.selectedID]
			? state.WorkersLog.LabourInput.General.OtherWorks[componentProps.selectedID].name
			: '',
});

const mapDispatchToProps = {

};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & componentProps;

function AcceptModalComponent(props: Props) {
	console.count('AcceptModalComponent');
	return (
		<Modal show={props.show} onHide={props.onCancel} backdrop="static" keyboard={false}>
			<Modal.Header>
				<Modal.Title>Uwaga!</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>
					Czy dodać wybraną pracę (<strong>{props.otherWorksOptionName}</strong>) do zestawienia?
				</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.onCancel}>
					Anuluj
				</Button>
				<Button variant="primary" onClick={props.onAccept}>
					Zatwierdź
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptModalComponent);
