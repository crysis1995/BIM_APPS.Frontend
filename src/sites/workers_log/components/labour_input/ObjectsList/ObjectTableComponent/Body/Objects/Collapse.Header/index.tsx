import { ArrowIcon } from '../../OtherWork/Utils/ArrowIcon';
import { EDirection } from '../../types/EDirection';
import LocaleNameComponent from '../../../../../../../../../localisation/LocaleNameComponent';
import React from 'react';
import { Button } from 'react-bootstrap';
import { RootState } from '../../../../../../../../../store';
import { connect } from 'react-redux';
import LabourInputObjectsActions from '../../../../../../../redux/labour_input/objects/actions';
import { createSelector } from 'reselect';

type ComponentProps = {
	eventKey: 'elements';
	setAccordion: (value: ((prevState: string | null) => string | null) | string | null) => void;
	actualAccordion: string | null;
};

const isGroupCreatorDisabledSelector = createSelector(
	(state: RootState) => state.WorkersLog.LabourInput.Objects.Selection,
	(state: RootState) => state.WorkersLog.LabourInput.Objects.ObjectsGroups,
	(selection, ObjectsGroups) => {
		const filteredSingleObjects = ObjectsGroups.filter((x) => typeof x === 'number');
		return selection.every((x) => filteredSingleObjects.includes(x)) && selection.length > 1;
	},
);

const mapStateToProps = (state: RootState) => ({
	isGroupCreatorDisabled: isGroupCreatorDisabledSelector(state),
});

const mapDispatchToProps = {
	GroupObjectsInit: LabourInputObjectsActions.GroupObjectsInit,
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;

function ObjectsHeaderComponent(props: Props) {
	const decoratedOnClick = () => props.setAccordion((prev) => (prev === props.eventKey ? null : props.eventKey));
	return (
		<tr>
			<th colSpan={2}>
				<ArrowIcon
					onClick={decoratedOnClick}
					direction={props.actualAccordion === props.eventKey ? EDirection.Down : EDirection.Up}
				/>
				<span className={'ml-2'}>
					<LocaleNameComponent value={props.eventKey} />
				</span>
			</th>
			<th>
				{props.actualAccordion === props.eventKey && (
					<>
						<Button
							className={'float-right'}
							variant={'light'}
							size={'sm'}
							disabled={!props.isGroupCreatorDisabled}
							onClick={props.GroupObjectsInit}>
							<svg
								className={'mr-2'}
								version="1.1"
								id="Layer_1"
								width={'16px'}
								height={'16px'}
								viewBox="0 0 512 512">
								<g>
									<g>
										<g>
											<path
												d="M106.667,0H21.333C9.551,0,0,9.551,0,21.333v85.333C0,118.449,9.551,128,21.333,128h85.333
				c11.782,0,21.333-9.551,21.333-21.333V21.333C128,9.551,118.449,0,106.667,0z M85.333,85.333H42.667V42.667h42.667V85.333z"
											/>
											<path
												d="M490.667,0h-85.333C393.551,0,384,9.551,384,21.333v85.333c0,11.782,9.551,21.333,21.333,21.333h85.333
				c11.782,0,21.333-9.551,21.333-21.333V21.333C512,9.551,502.449,0,490.667,0z M469.333,85.333h-42.667V42.667h42.667V85.333z"
											/>
											<path
												d="M106.667,384H21.333C9.551,384,0,393.551,0,405.333v85.333C0,502.449,9.551,512,21.333,512h85.333
				c11.782,0,21.333-9.551,21.333-21.333v-85.333C128,393.551,118.449,384,106.667,384z M85.333,469.333H42.667v-42.667h42.667
				V469.333z"
											/>
											<path
												d="M490.667,384h-85.333C393.551,384,384,393.551,384,405.333v85.333c0,11.782,9.551,21.333,21.333,21.333h85.333
				c11.782,0,21.333-9.551,21.333-21.333v-85.333C512,393.551,502.449,384,490.667,384z M469.333,469.333h-42.667v-42.667h42.667
				V469.333z"
											/>
											<path
												d="M256,85.333c11.776,0,21.333-9.557,21.333-21.333S267.776,42.667,256,42.667S234.667,52.224,234.667,64
				S244.224,85.333,256,85.333z"
											/>
											<path
												d="M170.667,85.333C182.443,85.333,192,75.776,192,64s-9.557-21.333-21.333-21.333S149.333,52.224,149.333,64
				S158.891,85.333,170.667,85.333z"
											/>
											<path
												d="M341.333,42.667C329.557,42.667,320,52.224,320,64s9.557,21.333,21.333,21.333c11.776,0,21.333-9.557,21.333-21.333
				S353.109,42.667,341.333,42.667z"
											/>
											<path
												d="M256,426.667c-11.776,0-21.333,9.557-21.333,21.333s9.557,21.333,21.333,21.333s21.333-9.557,21.333-21.333
				S267.776,426.667,256,426.667z"
											/>
											<path
												d="M64,277.333c11.776,0,21.333-9.557,21.333-21.333S75.776,234.667,64,234.667S42.667,244.224,42.667,256
				S52.224,277.333,64,277.333z"
											/>
											<path
												d="M64,362.667c11.776,0,21.333-9.557,21.333-21.333C85.333,329.557,75.776,320,64,320s-21.333,9.557-21.333,21.333
				C42.667,353.109,52.224,362.667,64,362.667z"
											/>
											<path
												d="M64,192c11.776,0,21.333-9.557,21.333-21.333S75.776,149.333,64,149.333s-21.333,9.557-21.333,21.333S52.224,192,64,192z
				"
											/>
											<path
												d="M448,277.333c11.776,0,21.333-9.557,21.333-21.333s-9.557-21.333-21.333-21.333s-21.333,9.557-21.333,21.333
				S436.224,277.333,448,277.333z"
											/>
											<path
												d="M448,362.667c11.776,0,21.333-9.557,21.333-21.333c0-11.776-9.557-21.333-21.333-21.333s-21.333,9.557-21.333,21.333
				C426.667,353.109,436.224,362.667,448,362.667z"
											/>
											<path
												d="M448,192c11.776,0,21.333-9.557,21.333-21.333s-9.557-21.333-21.333-21.333s-21.333,9.557-21.333,21.333
				S436.224,192,448,192z"
											/>
											<path
												d="M170.667,426.667c-11.776,0-21.333,9.557-21.333,21.333s9.557,21.333,21.333,21.333S192,459.776,192,448
				S182.443,426.667,170.667,426.667z"
											/>
											<path
												d="M341.333,426.667C329.557,426.667,320,436.224,320,448s9.557,21.333,21.333,21.333c11.776,0,21.333-9.557,21.333-21.333
				S353.109,426.667,341.333,426.667z"
											/>
											<path
												d="M341.333,234.667h-64v-64c0-11.782-9.551-21.333-21.333-21.333h-85.333c-11.782,0-21.333,9.551-21.333,21.333V256
				c0,11.782,9.551,21.333,21.333,21.333h64v64c0,11.782,9.551,21.333,21.333,21.333h85.333c11.782,0,21.333-9.551,21.333-21.333
				V256C362.667,244.218,353.115,234.667,341.333,234.667z M192,192h42.667v42.667H192V192z M320,320h-42.667v-42.667H320V320z"
											/>
										</g>
									</g>
								</g>
							</svg>
							Group
						</Button>
					</>
				)}
			</th>
			<th>{0}</th>
		</tr>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectsHeaderComponent);
