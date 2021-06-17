import React from 'react';
import { connect } from 'react-redux';
import { Col, Form } from 'react-bootstrap';
import { RootState } from '../../../../../store';
import { v4 } from 'uuid';
import GeneralActions from '../../../redux/monolithic/general/actions';
import { SelectorLevelInputOptions } from './Selector.LevelInputOptions';
import { SelectorLevelInputIsDisabled } from './Selector.LevelInputIsDisabled';

const mapStateToProps = (state: RootState) => ({
	isDisabled: SelectorLevelInputIsDisabled(state),
	active_level: state.WorkProgress.Monolithic.General.active_level,
	levels: SelectorLevelInputOptions(state),
});

const mapDispatchToProps = {
	ChangeLevel: GeneralActions.ChangeLevel,
};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function LevelSelector(props: Props) {
	return (
		<div className="w-25">
			<Form.Row className={'mr-3'}>
				<Col>
					<Form.Label>Kondygnacja</Form.Label>
					<Form.Control
						data-testid={'Selector'}
						onChange={(event) => {
							props.ChangeLevel(event.target.value === '' ? null : event.target.value);
						}}
						disabled={props.isDisabled}
						as="select"
						value={props.active_level || ''}
						size={'sm'}
						custom>
						<option value="">Wybierz...</option>
						{props.levels.map((e) => (
							<option data-testid="options" key={v4()} value={e.id}>
								{e.name}
							</option>
						))}
					</Form.Control>
				</Col>
			</Form.Row>
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelSelector);
