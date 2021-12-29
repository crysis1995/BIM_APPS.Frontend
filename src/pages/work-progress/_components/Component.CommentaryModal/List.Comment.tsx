import { useSelector } from 'react-redux';
import { RootState } from '../../../../state';
import Comment from './Comment';
import React from 'react';
import { createSelector } from 'reselect';
import { WorkProgress } from '../../../../state/WorkProgress';
import _ from 'lodash';
import { Props } from './Props';

const OrderedCommentsSelector = createSelector(
	WorkProgress.Selectors.CommentaryElement.AllCommentsByElementId,
	(comments) => {
		return _.orderBy(comments, (e) => e.updatedAt, 'desc');
	},
	{
		memoizeOptions: {
			resultEqualityCheck: _.isEqual,
		},
	},
);
export default function CommentaryList(props: Pick<Props, 'element'>) {
	const Comments = useSelector((state: RootState) =>
		OrderedCommentsSelector(state, props.element.id),
	);

	return (
		<>
			{Comments.map((comment, index) => (
				<Comment key={index} commentaryElement={comment} />
			))}
		</>
	);
}
