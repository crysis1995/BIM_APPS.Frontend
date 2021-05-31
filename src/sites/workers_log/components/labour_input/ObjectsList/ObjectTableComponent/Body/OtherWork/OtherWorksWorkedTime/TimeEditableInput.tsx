import { LabourInput } from '../../../../../../../redux/labour_input/types';
import { CMSLoginType } from '../../../../../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../../../../../redux';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import useDebounce from '../../../../../../../../../components/CustomHooks/UseDebounce';
import RoundHalf from '../../../../../../../../../utils/RoundHalf';
import { Form } from 'react-bootstrap';
import LabourInputTimeEvidenceActions from '../../../../../../../redux/labour_input/time_evidence/actions';

type componentProps = {
	setEditable: (data: boolean) => void;
	otherWorkID: LabourInput.Payload.TimeEvidence.OtherWorksTimeEvidence['id'];
};

const mapStateToProps = (
	state: {
		CMSLogin: CMSLoginType.Redux.Store;
		WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
	},
	componentProps: componentProps,
) => ({
	otherWork: state.WorkersLog.LabourInput.TimeEvidence.OtherWorksTimeEvidences?.[componentProps.otherWorkID],
});

const mapDispatchToProps = {
	UpdateOtherWorkStart: LabourInputTimeEvidenceActions.UpdateOtherWorkStart,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & componentProps;

function TimeEditableInput(props: Props) {
	const [value, setValue] = useState(props.otherWork ? props.otherWork.worked_time.toString() : '');
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
		if (parsedValue) {
			props.UpdateOtherWorkStart({ id: props.otherWorkID, worked_time: parsedValue });
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

export default connect(mapStateToProps, mapDispatchToProps)(TimeEditableInput);
