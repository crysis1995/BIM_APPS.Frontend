import React, { useState } from 'react';
import ButtonGroup from '../Molecules/ButtonGroup';

import ModelAcceptance from './Model.Acceptance';

function ButtonGroupWithActions() {
	const [modalActive, setModalActive] = useState(false);

	return (
		<>
			<ButtonGroup OnClickAcceptanceButton={() => setModalActive(true)} />
			{modalActive && <ModelAcceptance setModalActive={setModalActive} />}
		</>
	);
}

export default ButtonGroupWithActions;
