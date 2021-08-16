import React, { PropsWithChildren } from 'react';
import { connect } from 'react-redux';
import { Alert, Col } from 'react-bootstrap';
import { RootState } from '../../store';
import { createSelector } from 'reselect';
import { EApplications, EApplicationsWithModules } from '../../sites/types';

type ComponentProps = PropsWithChildren<{
	requiredApp: EApplications | EApplicationsWithModules;
}>;

const appPermSelector = createSelector(
	(state: RootState) => state.CMSLogin.warbud_apps,
	(state: RootState) => state.CMSLogin.actual_project,
	(state: RootState, componentProps: ComponentProps) => componentProps.requiredApp,
	(warbud_apps, actual_project, requiredApp) => {
		if (warbud_apps && actual_project) {
			return warbud_apps[actual_project.id].includes(requiredApp);
		}
		return false;
	},
);

const mapStateToProps = (state: RootState, componentProps: ComponentProps) => ({
	isHaveAppPerm: appPermSelector(state, componentProps),
	// isHaveAppPerm: true,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;
// type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps ;
function AppsPermissionAccessor(props: Props) {
	if (props.isHaveAppPerm) return <>{props.children || null}</>;
	else
		return (
			<Col sm={'auto'} className={'p-3'}>
				<Alert variant={'warning'}>Nie masz dostępu do wybranego modułu</Alert>
			</Col>
		);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppsPermissionAccessor);
