import { useSelector } from 'react-redux';
import { RootState } from '../../../../state';
import { WorkProgress } from '../../../../state/WorkProgress';
import React from 'react';
import { Props } from './Props';
import CommentaryList from './List.Comment';
import LoaderComponent from '../../../../components/Loader/LoaderComponent';

export default function CommentaryModalBody(props: Pick<Props, 'element'>) {
	const isLoading = useSelector((state: RootState) =>
		WorkProgress.Selectors.CommentaryElement.IsLoadingElement(state, props.element.id),
	);
	return (
		<LoaderComponent loading={isLoading}>
			<CommentaryList element={props.element} />
		</LoaderComponent>
	);
}
