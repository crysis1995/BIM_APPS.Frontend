import ForgeViewer from '../../../../../../components/ForgeViewer/types';
import { Constants } from '../../../constants';

export interface CurrentElementsFilterData {
	currentElements: number[];
	forgeElements: ForgeViewer.Payload.CurrentElementsFilterData;
	currentElementsWithStatuses?: { [key: string]: Constants.WorkProgressElementStatus };
}
