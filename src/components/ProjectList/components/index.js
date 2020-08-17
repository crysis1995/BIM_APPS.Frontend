import React from 'react';
import ProjectSelector from '../../../components/AutodeskBIM360/components/projectSelector';
import FolderView from '../../AutodeskBIM360/components/FolderView';
import './index.css';

function ProjectListComponent() {
	return (
		<div className="project-list px-3 pt-3">
			<ProjectSelector />
			<FolderView />
		</div>
	);
}

export default ProjectListComponent;
