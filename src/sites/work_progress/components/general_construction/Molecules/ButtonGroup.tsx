// import AcceptanceButton from '../Atoms/Button.Acceptance';
// import React from 'react';
// import ToggleStatusesOnModelButton from '../Atoms/Button.ToggleStatusesOnModel';
//
// import { useDispatch, useSelector } from 'react-redux';
// import GeneralConstructionGeneralActions from '../../../redux/general_construction/general/actions';
// import { createSelector } from 'reselect';
// import { RootState } from '../../../../../state';
//
// type ComponentProps = {
// 	OnClickAcceptanceButton: () => void;
// };
//
// const ToggleStatusesOnModelButton_IsDisabledSelector = createSelector(
// 	(state: RootState) => state.WorkProgress.GeneralConstruction.Objects.ObjectsLoading,
// 	(state: RootState) => state.ForgeViewer.model_elements_loading,
// 	(ObjectsLoading, model_elements_loading) => {
// 		return ObjectsLoading || model_elements_loading;
// 	},
// );
//
// function ButtonGroup(props: ComponentProps) {
// 	const ToggleStatusesOnModelButton_IsActive = useSelector(
// 		(state: RootState) => state.WorkProgress.GeneralConstruction.General.ShowStatusesOnModel,
// 	);
// 	const ToggleStatusesOnModelButton_IsDisabled = useSelector(ToggleStatusesOnModelButton_IsDisabledSelector);
// 	const AcceptanceButton_IsDisabledAcceptanceButton = useSelector((state: RootState) => false);
// 	const dispatch = useDispatch();
// 	function ClickStatusesOnModelButton() {
// 		dispatch(GeneralConstructionGeneralActions.ToggleStatusOnModelVisibility());
// 	}
// 	return (
// 		<>
// 			<ToggleStatusesOnModelButton
// 				isDisabled={ToggleStatusesOnModelButton_IsDisabled}
// 				isActive={ToggleStatusesOnModelButton_IsActive}
// 				OnClick={ClickStatusesOnModelButton}
// 			/>
// 			<AcceptanceButton
// 				className={'float-right'}
// 				isDisabled={AcceptanceButton_IsDisabledAcceptanceButton}
// 				HandleClickAcceptanceButton={props.OnClickAcceptanceButton}
// 			/>
// 		</>
// 	);
// }
// export default ButtonGroup;
export {}