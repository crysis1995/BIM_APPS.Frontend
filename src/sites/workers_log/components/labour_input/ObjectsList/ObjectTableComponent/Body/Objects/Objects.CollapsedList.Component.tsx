import ObjectCollapsedRowComponent from './Object.Row.Component';
import { v4 } from 'uuid';
import React from 'react';
import { CMSLoginType } from '../../../../../../../../components/CMSLogin/type';
import WorkersLogRedux from '../../../../../../redux';
import { connect } from 'react-redux';

type ComponentProps = {
	eventKey: 'elements';
	actualAccordion: string | null;
};

const mapStateToProps = (state: {
	CMSLogin: CMSLoginType.Redux.Store;
	WorkersLog: ReturnType<typeof WorkersLogRedux.reducer>;
}) => ({
	FilteredObjects: state.WorkersLog.LabourInput.Objects.FilteredObjects,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;

function ObjectsCollapsedListComponent(props: Props) {
	return (
		<>
			{props.FilteredObjects.map((objectID) => (
				<ObjectCollapsedRowComponent
					key={v4()}
					objectID={objectID}
					eventKey={props.eventKey}
					actualAccordion={props.actualAccordion}
				/>
			))}
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectsCollapsedListComponent);
