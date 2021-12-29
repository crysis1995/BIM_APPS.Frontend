import React, { createContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import './style.scss';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { CMSLoginSelectors } from '../../../../state/CMSLogin/selectors';
import TableHeader from '../Molecules/Table.Header';
import TableBody from '../Molecules/Table.Body';
import PaginationGroup from '../Molecules/PaginationGroup';
import { WorkProgress } from '../../../../state/WorkProgress';

const projectHeaderSelector = createSelector(
	CMSLoginSelectors.GetCurrentProjectCustomParams,
	(params) => params ?? [],
);
const PAGE_SIZE = 20;

const pagesCountSelector = createSelector(
	WorkProgress.Selectors.Elements.GetAllElementsByIdAsList,
	(allElements) => {
		return Math.floor(allElements.length / PAGE_SIZE);
	},
	{
		memoizeOptions: {
			equalityCheck: _.isEqual,
		},
	},
);
export type PaginationContextType = { currentPage: number; pageSize: number; pagesCount: number };
const PaginationContextData = {
	currentPage: 0,
	pageSize: PAGE_SIZE,
	pagesCount: 0,
};
const defaultContextSetter: React.Dispatch<React.SetStateAction<PaginationContextType>> = (value) =>
	value;
const paginationContext = [PaginationContextData, defaultContextSetter] as const;
export const PaginationContext = createContext(paginationContext);

function ElementContainer() {
	const [contextValue, setContextValue] = useState<PaginationContextType>(PaginationContextData);
	const columns = useSelector(projectHeaderSelector, _.isEqual);
	const pagesCount = useSelector(pagesCountSelector);

	useEffect(() => {
		setContextValue((prev) => ({ ...prev, pagesCount }));
	}, [pagesCount]);

	return (
		<PaginationContext.Provider value={[contextValue, setContextValue]}>
			<div className={'d-flex flex-row'}>
				<Table size={'sm'} className={'m-0'}>
					<TableHeader columns={columns} />
					<TableBody columns={columns} />
				</Table>
			</div>
			{pagesCount > 0 && (
				<div className={'d-flex flex-row pt-3'}>
					<PaginationGroup />
				</div>
			)}
		</PaginationContext.Provider>
	);
}

export default ElementContainer;
