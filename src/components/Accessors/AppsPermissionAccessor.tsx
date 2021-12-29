import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Col } from 'react-bootstrap';

import { AppEnum } from '../../generated/graphql';
import { RootState } from '../../state';
import { CMSLoginSelectors } from '../../state/CMSLogin/selectors';

type ComponentProps = PropsWithChildren<{
	requiredApp: AppEnum;
}>;

function AppsPermissionAccessor(props: ComponentProps) {
	const isHaveAppPerm = useSelector((state: RootState) =>
		CMSLoginSelectors.CurrentProjectAppsPermissions(state, props.requiredApp),
	);
	if (isHaveAppPerm) return <>{props.children || null}</>;
	else
		return (
			<Col sm={'auto'} className={'p-3'}>
				<Alert variant={'warning'}>Nie masz dostępu do wybranego modułu</Alert>
			</Col>
		);
}

export default React.memo(AppsPermissionAccessor);
