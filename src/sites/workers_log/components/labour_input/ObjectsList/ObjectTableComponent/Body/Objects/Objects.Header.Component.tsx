import { ActualEventKeyAwareRowComponent } from '../OtherWork/Utils/ActualEventKeyAwareRowComponent';
import { ArrowIcon } from '../OtherWork/Utils/ArrowIcon';
import { EDirection } from '../types/EDirection';
import LocaleNameComponent from '../../../../../../../../localisation/LocaleNameComponent';
import React from 'react';

 function ObjectsHeaderComponent(props: {
	eventKey: 'elements';
	setAccordion: (value: ((prevState: string | null) => string | null) | string | null) => void;
	actualAccordion: string | null;
}) {
	return (
		<ActualEventKeyAwareRowComponent eventKey={props.eventKey} setActualAccordion={props.setAccordion}>
			<th colSpan={3}>
				<ArrowIcon direction={props.actualAccordion === props.eventKey ? EDirection.Down : EDirection.Up} />
				<span className={'ml-2'}>
					<LocaleNameComponent value={props.eventKey} />
				</span>
			</th>
			<th>{0}</th>
		</ActualEventKeyAwareRowComponent>
	);
}
export default ObjectsHeaderComponent