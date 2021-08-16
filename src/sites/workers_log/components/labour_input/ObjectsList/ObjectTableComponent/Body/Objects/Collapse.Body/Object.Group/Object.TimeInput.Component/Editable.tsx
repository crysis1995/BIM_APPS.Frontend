import { connect } from 'react-redux';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import LabourInputTimeEvidenceActions from '../../../../../../../../../redux/labour_input/time_evidence/actions';
import { RootState } from '../../../../../../../../../../../store';
import RoundHalf from '../../../../../../../../../../../utils/RoundHalf';

type ComponentProps = {
	setEditable: (data: boolean) => void;
	objectID: string;
};
const mapStateToProps = (state: RootState, componentProps: ComponentProps) => ({
	object: state.WorkersLog.LabourInput.TimeEvidence.ObjectsTimeEvidences?.[componentProps.objectID],
});

const mapDispatchToProps = {
	UpdateObjectTimeEvidenceStart: LabourInputTimeEvidenceActions.UpdateObjectTimeEvidenceStart,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;

function TimeInputEditable(props: Props) {
	const [value, setValue] = useState<number | undefined>(
		props.object && props.object.worked_time ? props.object.worked_time : undefined,
	);

	const CancelEditing = (e: React.FocusEvent<HTMLInputElement>) => {
		if (value !== undefined && value !== props.object?.worked_time) {
			props.UpdateObjectTimeEvidenceStart(props.objectID, RoundHalf(value));
		}
		props.setEditable(false);
	};

	function HandleFocus(event: React.FocusEvent<HTMLInputElement>) {
		event.target.select();
	}

	return (
		<td>
			<Form.Control
				onFocus={HandleFocus}
				autoFocus
				value={value}
				onChange={(data) => setValue(parseFloat(data.target.value))}
				onBlur={CancelEditing}
				style={{ maxWidth: 60, minWidth: 60 }}
				className={'p-1'}
				size={'sm'}
				type={'number'}
				min={0}
			/>
		</td>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeInputEditable);
