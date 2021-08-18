import ForgeViewer from '../../../../../../../components/ForgeViewer/types';

export type AddToContainersOptions = Omit<
	ForgeViewer.Payload.ElementOperationTypesEnum,
	ForgeViewer.Payload.ElementOperationTypesEnum.COLORED
>;
