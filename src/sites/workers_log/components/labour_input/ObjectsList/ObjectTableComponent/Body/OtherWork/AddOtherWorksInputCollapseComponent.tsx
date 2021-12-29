import ActualEventKeyRowViewer from './Utils/ActualEventKeyRowViewer';
import { Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { OTHER_WORK_TYPE } from '../../../../../../../../services/graphql.api.service/CONSTANTS/GeneralTypes';
import AcceptModalComponent from './Modal/AcceptModalComponent';
import LabourInputTimeEvidenceActions from '../../../../../../redux/labour_input/time_evidence/actions';
import { RootState } from '../../../../../../../../state';

type componentProps = {
	eventKey: string;
	actualAccordion: string | null;
	option: OTHER_WORK_TYPE;
};

const mapStateToProps = (state: RootState, componentProps: componentProps) => ({
	otherWorksOptions: (() => {
		const otherWorks = state.WorkersLog.LabourInput.General.OtherWorks;
		const otherWorksUsedOptions =
			state.WorkersLog.LabourInput.TimeEvidence.OtherWorksTimeEvidences &&
			componentProps.option === OTHER_WORK_TYPE.HELPER
				? Object.values(
						state.WorkersLog.LabourInput.TimeEvidence.OtherWorksTimeEvidences,
				  ).map((x) => x.other_works_option.id)
				: [];

		if (otherWorks) {
			return Object.values(otherWorks)
				.filter(
					(x) =>
						x.work_type === componentProps.option &&
						(x.crew_type === null ||
							x.crew_type === state.WorkersLog.LabourInput.General.ActiveWorkType),
				)
				.filter((x) => !otherWorksUsedOptions.includes(x.id))
				.map((x) => ({ id: x.id, label: x.name }));
		} else {
			return [];
		}
	})(),
});

const mapDispatchToProps = {
	CreateOtherWorkStart: LabourInputTimeEvidenceActions.CreateOtherWorkStart,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & componentProps;

function AddOtherWorksInputCollapseComponent(props: Props) {
	const [show, setShow] = useState(false);
	const [selectedOptionId, setSelectedOptionId] = useState('');
	const handleCloseButton = () => {
		setShow(false);
	};
	const handleAddButton = (commentary?: string) => {
		setShow(false);
		props.CreateOtherWorkStart({ id: selectedOptionId, work_type: props.option, commentary });
		setSelectedOptionId('');
	};

	const handleAddNewOtherWork = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedOptionId(e.target.value);
		if (e.target.value !== '') {
			setShow(true);
		}
	};

	return (
		<>
			<ActualEventKeyRowViewer show={props.eventKey === props.actualAccordion}>
				<td>
					<Form.Control
						value={selectedOptionId}
						onChange={handleAddNewOtherWork}
						style={{ width: 'auto' }}
						as={'select'}
						size={'sm'}>
						<option>Wybierz nową robotę...</option>
						{props.otherWorksOptions.map(({ id, label }) => (
							<option key={id} value={id}>
								{label}
							</option>
						))}
					</Form.Control>
				</td>
				<td colSpan={3} />
			</ActualEventKeyRowViewer>
			<AcceptModalComponent
				option={props.option}
				show={show}
				selectedID={selectedOptionId}
				onCancel={handleCloseButton}
				onAccept={handleAddButton}
			/>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOtherWorksInputCollapseComponent);
