import { Constants } from '../../../constants';
import { Class } from './Class.Interface';
import ModeClassifierInterface from './Mode.Classifier.Interface';

export type TabClassifier = {
	[key in Constants.MonolithicTabs]?: Class<ModeClassifierInterface>;
};