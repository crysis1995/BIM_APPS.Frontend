import { GetStatusesType } from '../../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetStatuses';
import { Form } from 'react-bootstrap';
import React from 'react';
import { v4 } from 'uuid';
import LocaleNameEngine from '../../../../../../../localisation/LocaleName.Core';
import { Lang } from '../../../../../../../localisation/Lang';
import { connect } from 'react-redux';
import { RootState } from '../../../../../../../store';
import { GetStatusesSelector } from './Selector.GetStatuses';

type ComponentProps = {
	setStatus: (data: string | null) => void;
	status: string | null;
};

const mapStateToProps = (state: RootState) => ({
	statuses_options: GetStatusesSelector(state),
});
const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;

function StatusFormInput(props: Props) {
	return (
		<>
			<Form.Label>Ustaw status elementów</Form.Label>
			<Form.Control
				data-testid={'Selector'}
				onChange={(data) => props.setStatus(data.target.value !== '' ? data.target.value : null)}
				as="select"
				value={props.status || ''}
				size={'sm'}
				custom>
				<option value="">Wybierz...</option>
				{props.statuses_options.map((e) => (
					<option key={v4()} value={e.id}>
						{LocaleNameEngine({
							value: e.name as GetStatusesType.DBStatuses,
							lang: Lang.PL,
						})}
					</option>
				))}
			</Form.Control>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusFormInput);
