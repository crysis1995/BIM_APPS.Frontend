import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { Badge, Spinner } from 'react-bootstrap';
import LocaleNameComponent from '../../../../../localisation/LocaleNameComponent';
import ObjectSelectors from '../../../redux/general_construction/objects/selectors';

type ComponentProps = {
	item: number;
};

function Status(props: ComponentProps) {
	const statusLoading = useSelector((state: RootState) => ObjectSelectors.ObjectStatusIsLoading(state, props));
	const status = useSelector((state: RootState) => ObjectSelectors.ObjectStatus(state, props));
	if (statusLoading)
		return (
			<Badge className={'p-1 small'} variant={'secondary'}>
				<Spinner animation="border" size="sm" variant="light" role="status">
					<span className="sr-only">Loading...</span>
				</Spinner>
			</Badge>
		);
	if (status)
		return (
			<Badge
				className={'p-1 small'}
				// style={{ backgroundColor: statusesMatcher[status.status].color, color: '#ffffff' }}
			>
				<LocaleNameComponent value={status.status} />
			</Badge>
		);
	return null;
}

export default Status;
