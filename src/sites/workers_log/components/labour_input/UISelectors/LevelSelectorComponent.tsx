import React from 'react';
import { CMSLoginType } from '../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../redux';
import { connect } from 'react-redux';
import Selector from '../../../../../components/Selector';
import LabourInputGeneralActions from '../../../redux/labour_input/general/actions';

const mapStateToProps = (state: {
	CMSLogin: CMSLoginType.Redux.Store;
	WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
}) => ({
	loading: state.CMSLogin.loading,
	levels: state.CMSLogin.actual_project?.levels_all,
	ActiveLevel: state.WorkersLog.LabourInput.General.ActiveLevel,
});

const mapDispatchToProps = {
	ChooseLevel: LabourInputGeneralActions.ChooseLevel,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function LevelSelectorComponent(props: Props) {
	return (
		<Selector
			classname={''}
			label={'Kondygnacja'}
			isDisabled={props.loading || !props.levels}
			value={props.ActiveLevel?.id}
			options={props.levels ? Object.values(props.levels) : []}
			onChangeValue={(id: string) => props.levels && props.ChooseLevel(props.levels[id])}
		/>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelSelectorComponent);
