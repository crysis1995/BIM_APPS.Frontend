import { GetObjectsByLevelType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';
import React, { Dispatch, SetStateAction } from 'react';
import { Form } from 'react-bootstrap';
import { v4 } from 'uuid';
import LocaleNameEngine from '../../../../../localisation/LocaleName.Core';
import { Lang } from '../../../../../localisation/Lang';

export function StatusFormInput(props: {
	status: null | GetObjectsByLevelType.StatusEnum;
	setStatus: Dispatch<SetStateAction<null | GetObjectsByLevelType.StatusEnum>>;
}) {
	const options = Object.values(GetObjectsByLevelType.StatusEnum) as GetObjectsByLevelType.StatusEnum[];
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
				as='select'
				value={props.status || ''}
				size={'sm'}
				custom>
				<option value=''>Wybierz...</option>
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