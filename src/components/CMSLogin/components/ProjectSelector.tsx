import { useDispatch, useSelector } from 'react-redux';

import _ from 'lodash';
import { Form } from 'react-bootstrap';

import { v4 } from 'uuid';
import React from 'react';
import { Project } from '../../../generated/graphql';
import CMSLoginActions from '../../../state/CMSLogin/actions';
import { CMSLoginSelectors } from '../../../state/CMSLogin/selectors';


export function ProjectSelector() {
	const currentProject = useSelector(CMSLoginSelectors.GetCurrentProject, _.isEqual);
	const projects = useSelector(CMSLoginSelectors.UserProjects, _.isEqual);
	const dispatch = useDispatch();

	function GetProjectName(proj: Project) {
		return proj.webconCode ? proj.webconCode + ' - ' + proj.name : proj.name;
	}

	return (
		<Form className="mr-3" inline>
			<Form.Control
				value={currentProject?.id ?? ''}
				onChange={(event) =>
					dispatch(
						CMSLoginActions.SetCurrentProjectId({
							projectId: parseInt(event.target.value),
						}),
					)
				}
				as="select"
				size={'sm'}>
				<option>Wybierz...</option>
				{projects.length &&
					projects.map((proj) => (
						<option data-testid="options" key={v4()} value={proj.id}>
							{GetProjectName(proj)}
						</option>
					))}
			</Form.Control>
		</Form>
	);
}
