import React from 'react';
import TableHeader from '../Molecules/Table.Header';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { RootState } from '../../../../../store';
import { Table } from 'react-bootstrap';
import TableBody from '../Molecules/Table.Body';
import _ from 'lodash';
import "./style.scss"
const projectHeaderSelector = createSelector(
	(state: RootState) => state.CMSLogin.actual_project?.params,
	(params) => {
		if (!params) return [];
		return params
			.map<{ key?: string; description?: string }>((param) => {
				let data: { key?: string; description?: string } = {};
				if (param.key) {
					data.key = param.key;
				}
				if (param.description) {
					data.description = param.description;
				}
				return data;
			})
			.filter((x) => Boolean(x.key) || Boolean(x.description)) as (
			| { key?: string; description: string }
			| { key: string; description?: string }
		)[];
	},
);

function ElementContainer() {
	const headerList = useSelector(projectHeaderSelector, _.isEqual);
	return (
		<>
			<Table size={'sm'} className={'table_GC'}>
				<TableHeader headerList={headerList} />
				<TableBody headerList={headerList} />
			</Table>
		</>
	);
}

export default ElementContainer;
