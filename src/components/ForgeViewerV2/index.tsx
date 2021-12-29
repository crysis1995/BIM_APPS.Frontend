import React, { useEffect, useState } from 'react';
import { AppEnum } from '../../generated/graphql';
import { useSelector } from 'react-redux';
import { ModelSelector } from '../ForgeViewer/redux/selector';
import { Login3LeggedSelector } from '../../state/Autodesk/selectors';

type ComponentProps = {
	runBy: AppEnum;
};



export default function ForgeViewerV2(props: ComponentProps) {
	const [currentURN, setCurrentUrn] = useState<string | null>(null);
	const models = useSelector(ModelSelector);
	const login3Legged = useSelector(Login3LeggedSelector);
	useEffect(() => {
		if (models?.length == 1) {
			setCurrentUrn(models[0].modelUrn);
		}
	}, [models]);


	return <div id="forgeViewer" />;
}
