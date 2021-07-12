import { Button, Form, Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CMSLoginType } from '../../../../../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../../../../../redux';
import { OTHER_WORK_TYPE } from '../../../../../../../../../services/graphql.api.service/CONSTANTS/GeneralTypes';
import HideComponent from '../../../../../../../../../components/HideComponent';

type componentProps = {
	show: boolean;
	onCancel: () => void;
	onAccept: (commentary?: string) => void;
	selectedID: string;
	option: OTHER_WORK_TYPE;
};

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

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & componentProps;

function AcceptModalComponent(props: Props) {
	const [commentary, setCommentary] = useState('');
	if (props.otherWorksOptionName)
		return (
			<Modal show={props.show} onHide={props.onCancel} backdrop="static" keyboard={false}>
				<Modal.Header>
					<Modal.Title>Uwaga!</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<HideComponent when={props.option !== OTHER_WORK_TYPE.ADDITIONAL}>
						<Form.Label>Opis dodatkowy</Form.Label>
						<Form.Control
							onChange={(e) => setCommentary(e.target.value)}
							value={commentary}
							className={'p-1'}
							size={'sm'}
							type={'text'}
						/>
						<hr />
					</HideComponent>
					<p>
						Czy dodać wybraną pracę (<strong>{props.otherWorksOptionName}</strong>) do zestawienia?
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={props.onCancel}>
						Anuluj
					</Button>
					<Button variant="primary" onClick={() => props.onAccept(commentary)}>
						Zatwierdź
					</Button>
				</Modal.Footer>
			</Modal>
		);
	else return null;
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptModalComponent);
