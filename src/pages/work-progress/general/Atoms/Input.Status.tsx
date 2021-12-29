// import { GetObjectsByLevelType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetObjectsByLevel';
import React, { Dispatch, SetStateAction } from 'react';
import { Form } from 'react-bootstrap';
import { v4 } from 'uuid';
import { StatusEnum } from '../../../../generated/graphql';
import { useSelector } from 'react-redux';
import { CMSLoginSelectors } from '../../../../state/CMSLogin/selectors';
// import LocaleNameEngine from '../../../../../localisation/LocaleName.Core';
// import { Lang } from '../../../../../localisation/Lang';

export function StatusFormInput(props: {
	status: null | StatusEnum;
	setStatus: Dispatch<SetStateAction<null | StatusEnum>>;
}) {
	const statusOptions = useSelector(CMSLoginSelectors.GetProjectStatuses);
	return (
		<>
			<Form.Label>Ustaw status elementów</Form.Label>
			<Form.Control
				data-testid={'Selector'}
				onChange={(data) => {
					props.setStatus(
						data.target.value !== '' ? (data.target.value as StatusEnum) : null,
					);
				}}
				as="select"
				value={props.status || ''}
				size={'sm'}
				custom>
				<option value="">Wybierz...</option>
				{statusOptions.map((e) => (
					<option key={v4()} value={e}>
						{e}
						{/*{LocaleNameEngine({*/}
						{/*	value: e as GetObjectsByLevelType.StatusEnum,*/}
						{/*	lang: Lang.PL,*/}
						{/*})}*/}
					</option>
				))}
			</Form.Control>
		</>
	);
}
