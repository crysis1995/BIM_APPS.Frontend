import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import RoundHalf from '../../../../../../../../../../../utils/RoundHalf';
import useDebounce from '../../../../../../../../../../../components/CustomHooks/UseDebounce';

import LabourInputObjectsActions from '../../../../../../../../../redux/labour_input/objects/actions';
import { RootState } from '../../../../../../../../../../../state';

type ComponentProps = {
	setEditable: (data: boolean) => void;
	objectID: number;
};
const mapStateToProps = (state: RootState, componentProps: ComponentProps) => ({
	object: state.WorkersLog.LabourInput.TimeEvidence.ObjectsTimeEvidences?.[componentProps.objectID],
});

const mapDispatchToProps = {
	GroupObjectsInit: LabourInputObjectsActions.GroupObjectsInit,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;

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
		if (parsedValue !== null) {
			props.GroupObjectsInit([props.objectID], parsedValue);
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
				className={'p-0'}
				size={'sm'}
				type={'text'}
			/>
		</td>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeInputEditable);
