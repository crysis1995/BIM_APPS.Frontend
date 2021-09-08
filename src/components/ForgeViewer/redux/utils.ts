import ForgeViewer from '../types';
import { RootState } from '../../../store';

export type EmptyForgeViewerPayloadOptions = {
	keepSelected: boolean;
};

const DefaultOptions: EmptyForgeViewerPayloadOptions = {
	keepSelected: false,
};

export const EmptyForgeViewerPayload = (
	state?: RootState,
	options: EmptyForgeViewerPayloadOptions = DefaultOptions,
) => ({
	[ForgeViewer.Payload.ElementOperationTypesEnum.COLORED]: {},
	[ForgeViewer.Payload.ElementOperationTypesEnum.HIDDEN]: [],
	[ForgeViewer.Payload.ElementOperationTypesEnum.DISABLED]: [],
	[ForgeViewer.Payload.ElementOperationTypesEnum.SELECTED]:
		options.keepSelected && state ? state.ForgeViewer.selected_elements : [],
	[ForgeViewer.Payload.ElementOperationTypesEnum.VISIBLE]: [],
});
