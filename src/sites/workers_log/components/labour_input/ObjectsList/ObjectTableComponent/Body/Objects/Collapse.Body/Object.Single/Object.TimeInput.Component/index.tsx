import { connect } from 'react-redux';
import React, { useState } from 'react';
import Editable from './Editable';
import { RootState } from '../../../../../../../../../../../store';

type componentProps = { objectID: number };
const mapStateToProps = (state: RootState, componentProps: componentProps) => ({});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & componentProps;

function ObjectTimeInputComponent(props: Props) {
	const [editable, setEditable] = useState(false);

	if (editable) return <Editable setEditable={setEditable} objectID={props.objectID} />;
	else return <td onClick={() => setEditable(true)}> </td>;
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectTimeInputComponent);
