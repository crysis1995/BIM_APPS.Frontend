import { AddToContainersOptions } from './AddToContainersOptions';
import ForgeViewer from '../../../../../../../components/ForgeViewer/types';
import { Constants } from '../../../../../../work_progress/redux/constants';

export interface Options {
	valid: boolean;
	addTo: AddToContainersOptions | AddToContainersOptions[];
	color: ForgeViewer.Payload.Color | null;
	status?: Constants.WorkProgressElementStatus;
}
