import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import RoundHalf from '../../../../../../../../../../../utils/RoundHalf';
import useDebounce from '../../../../../../../../../../../components/CustomHooks/UseDebounce';
import LabourInputTimeEvidenceActions from '../../../../../../../../../redux/labour_input/time_evidence/actions';
import { RootState } from '../../../../../../../../../../../store';
import WorkersLog from '../../../../../../../../../types';

const mapStateToProps = (
	state: RootState,
	componentProps: { objectID: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus['id'] },
) => ({
	object: state.WorkersLog.LabourInput.TimeEvidence.ObjectsTimeEvidences?.[componentProps.objectID],
});

const mapDispatchToProps = {
	CreateOrUpdateObjectTimeEvidenceStart: LabourInputTimeEvidenceActions.CreateOrUpdateObjectTimeEvidenceStart,
};

type Props = ReturnType<typeof mapStateToProps> &
	typeof mapDispatchToProps & {
		setEditable: (data: boolean) => void;
		objectID: WorkersLog.LabourInput.Payload.Objects.ObjectWithStatus['id'];
	};

function TimeInputEditable(props: Props) {
	const [value, setValue] = useState(props.object ? props.object.worked_time.toString() : '');
	const [parsedValue, setParsedValue] = useState<number | null>(null);

	const debouncedValue = useDebounce(value, 300);

	useEffect(() => {
		if (debouncedValue) {
			const value = parseFloat(debouncedValue) > 0 ? RoundHalf(parseFloat(debouncedValue)) : 0;
			setValue(value.toString());
			setParsedValue(value);
		} else {
			setParsedValue(null);
		}
	}, [debouncedValue]);

	const CancelEditing = (e: React.FocusEvent<HTMLInputElement>) => {
		const objectTimeEidenceID = props.object ? props.object.id : null;
		if (parsedValue) {
			props.CreateOrUpdateObjectTimeEvidenceStart(objectTimeEidenceID, props.objectID, parsedValue);
		}
		props.setEditable(false);
	};

	return (
		<td>
			<Form.Control
				autoFocus
				value={value}
				onChange={(data) => setValue(data.target.value)}
				onBlur={CancelEditing}
				style={{ maxWidth: 40, minWidth: 40 }}
				className={'p-1'}
				size={'sm'}
				type={'text'}
			/>
		</td>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeInputEditable);
