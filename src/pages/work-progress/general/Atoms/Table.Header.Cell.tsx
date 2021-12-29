import React from 'react';
// import { QueryAcceptanceObjectsType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/QueryAcceptanceObjects';
import { useDispatch } from 'react-redux';
// import ObjectSelectors from '../../../redux/general_construction/objects/selectors';
// import GeneralConstructionObjectActions from '../../../redux/general_construction/objects/actions';
// import { Sorting } from './Sorting';
import { CustomParams } from '../../../../generated/graphql';
// import { Context } from '../Pages/Page.Index';

type ComponentProps = {
	header: CustomParams;
};

function TableHeaderCell(props: ComponentProps) {
	// const sortingOptions = useSelector(ObjectSelectors.ObjectsSortingOptionsSelector);
	const dispatch = useDispatch();

	function HandleClick() {
		// if (key) {
		// dispatch(GeneralConstructionObjectActions.SetSortingOptions(key));
		// }
	}

	const description = (props.header.description || props.header.key) ?? '';
	// const key = props.header.key as keyof QueryAcceptanceObjectsType.DataType | undefined;

	// const value = useContext(Context);
	return (
		<th className={'text-right'} onClick={HandleClick}>
			{/*<Sorting options={sortingOptions} headerKey={key}>*/}
			{description}
			{/*</Sorting>*/}
		</th>
	);
}

export default TableHeaderCell;
