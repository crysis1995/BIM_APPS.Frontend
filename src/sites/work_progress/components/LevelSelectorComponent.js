import React from 'react';
import { connect } from 'react-redux';
import { setCurrentSheet } from '../../../components/ForgeViewer/redux/actions';
import Selector from '../../../components/Selector';

function LevelSelectorComponent(props) {
	return (
		<Selector
			label={'Kondygnacja'}
			onChangeValue={props.setCurrentSheet}
			isDisabled={props.objects_jobs_loading}
			value={props.current_sheet}
			options={props.sheets}
			option_id_property={'index'}
			classname={'mb-1'}
		/>
	);
}

const mapStateToProps = ({ Odbiory, ForgeViewer }) => ({
	objects_jobs_loading: Odbiory.Jobs.objects_jobs_loading,
	current_sheet: ForgeViewer.current_sheet,
	sheets_loaded: ForgeViewer.sheets_loaded,
	sheets: ForgeViewer.sheets,
});

const mapDispatchToProps = {
	setCurrentSheet,
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelSelectorComponent);
