import { RootState } from '../../_types/RootState';

function AllElementsByIdAsDict(state: RootState) {
	return state.WorkProgress.CommentaryElement.AllById;
}
function AllElementsByIdAsList(state: RootState) {
	return Object.values(AllElementsByIdAsDict(state));
}
function AllLoadingElementsAsDict(state: RootState) {
	return state.WorkProgress.CommentaryElement.LoadingByElementId;
}
function AllLoadingElementsAsList(state: RootState) {
	return Object.values(AllLoadingElementsAsDict(state));
}
function IsLoadingElement(state: RootState, elementId: number) {
	return AllLoadingElementsAsDict(state)?.[elementId] ?? false;
}
function AllCommentsByElementId(state: RootState, elementId: number) {
	const commentIds = state.WorkProgress.CommentaryElement.AllByElementId?.[elementId] ?? [];
	return commentIds.map((e) => state.WorkProgress.CommentaryElement.AllById[e]);
}
function CountElementComments(state: RootState, elementId: number) {
	return AllCommentsByElementId(state, elementId).length;
}

export default {
	AllElementsByIdAsDict,
	AllElementsByIdAsList,
	AllLoadingElementsAsDict,
	AllLoadingElementsAsList,
	IsLoadingElement,
	AllCommentsByElementId,
	CountElementComments,
};
