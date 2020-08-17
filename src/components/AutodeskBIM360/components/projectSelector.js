import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import { AutodeskBIM360Actions } from '../redux';
import { selectCurrentProject } from '../redux/operations';

function ProjectSelector(props) {
	return (
		<Form>
			{props.projects.length > 0 ? (
				<>
					<Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
						Wybierz projekt
					</Form.Label>
					<Form.Control
						as="select"
						className="my-1 mr-sm-2 sm"
						id="inlineFormCustomSelectPref"
						custom
						size="sm"
						value={props.currentProject}
						onChange={(e) => props.selectCurrentProject(e.target.value || '')}>
						<option value="">Choose...</option>
						{props.projects.map((proj) => (
							<option key={v4()} value={proj.id}>
								{proj.attributes.name}
							</option>
						))}
					</Form.Control>
				</>
			) : null}
		</Form>
	);
}

const mapStateToProps = ({ AutodeskBIM360 }) => ({
	...AutodeskBIM360,
});

const mapDispatchToProps = {
	...AutodeskBIM360Actions,
	selectCurrentProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelector);
