import ForgeViewer from '../../../../../../../components/ForgeViewer/types';
import { Constants } from '../../../../../../work_progress/redux/constants';


export interface CurrentElementsFilterData {
	currentElements: number[];
	forgeElements: ForgeViewer.Payload.CurrentElementsFilterData;
	currentElementsWithStatuses?: { [key: string]: Constants.WorkProgressElementStatus };
}
