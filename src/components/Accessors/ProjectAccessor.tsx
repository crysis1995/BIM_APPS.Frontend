import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CMSLoginType } from '../CMSLogin/type';
import { Redirect } from 'react-router-dom';
import ModalActions from '../Modal/redux/actions';
import { ModalType } from '../Modal/type';

const mapStateToProps = (state: { CMSLogin: CMSLoginType.Redux.Store }) => ({
	project: state.CMSLogin.actual_project,
});

const mapDispatchToProps = {
	InitializeModal: ModalActions.InitializeModal,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
const ProjectAccessor: React.FunctionComponent<Props> = (props) => {
	useEffect(() => {
		if (!props.project?.id)
			props.InitializeModal({
				body: 'Wybierz projekt',
				modalType: ModalType.Payload.EModalType.Error,
				title: 'Uwaga!',
			});
		else if (!props.project?.urn)
			props.InitializeModal({
				body: 'Model niedostępny dla wybranego projektu',
				modalType: ModalType.Payload.EModalType.Error,
				title: 'Uwaga!',
			});
	}, [props.project]);
	if (props.project?.id && props.project?.urn) return <>{props.children}</>;
	return <Redirect to="/" />;
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAccessor);
