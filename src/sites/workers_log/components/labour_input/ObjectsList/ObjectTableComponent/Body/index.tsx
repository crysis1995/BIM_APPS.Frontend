import React from 'react';
import RowObjectComponent from './Row.Object.Component';
import { v4 } from 'uuid';
import { connect } from 'react-redux';
import { CMSLoginType } from '../../../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../../../redux';
import HideComponent from '../../../../../../../components/HideComponent';

const mapStateToProps = (state: {
	CMSLogin: CMSLoginType.Redux.Store;
	WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
}) => ({
	objectsNotLoaded: !state.WorkersLog.LabourInput.Objects.AllObjects,
	FilteredObjects: state.WorkersLog.LabourInput.Objects.FilteredObjects,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function TableBodyComponent(props: Props) {
	console.count('TableBodyComponent');
	return (
		<HideComponent when={props.objectsNotLoaded}>
			<tbody>
				{props.FilteredObjects.map((objectID) => (
					<RowObjectComponent key={v4()} objectID={objectID} />
				))}
			</tbody>
		</HideComponent>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(TableBodyComponent);
