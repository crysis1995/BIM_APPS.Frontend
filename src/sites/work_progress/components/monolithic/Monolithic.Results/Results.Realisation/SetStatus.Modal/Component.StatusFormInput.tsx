import { Form } from 'react-bootstrap';
import React from 'react';
import { v4 } from 'uuid';
import LocaleNameEngine from '../../../../../../../localisation/LocaleName.Core';
import { Lang } from '../../../../../../../localisation/Lang';
import { connect } from 'react-redux';

import { GetObjectsByLevelType } from '../../../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';
import { RootState } from '../../../../../../../state';

type ComponentProps = {
	setStatus: (data: GetObjectsByLevelType.StatusEnum | null) => void;
	status: GetObjectsByLevelType.StatusEnum | null;
};

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;

function StatusFormInput(props: Props) {
	const options = Object.values(GetObjectsByLevelType.StatusEnum) as GetObjectsByLevelType.StatusEnum[];
	console.log(options)
	return (
		<>
			<Form.Label>Ustaw status elementów</Form.Label>
			<Form.Control
				data-testid={'Selector'}
				onChange={(data) =>
					props.setStatus(
						data.target.value !== '' ? (data.target.value as GetObjectsByLevelType.StatusEnum) : null,
					)
				}
				as="select"
				value={props.status || ''}
				size={'sm'}
				custom>
				<option value="">Wybierz...</option>
				{options.map((e) => (
					<option key={v4()} value={e}>
						{LocaleNameEngine({
							value: e as GetObjectsByLevelType.StatusEnum,
							lang: Lang.PL,
						})}
					</option>
				))}
			</Form.Control>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusFormInput);
