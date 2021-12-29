import WorkersLog from '../../../../../../../../types';
import React, { createRef, useEffect } from 'react';
import classNames from 'classnames';
import { ArrowIcon } from '../../../OtherWork/Utils/ArrowIcon';
import { EDirection } from '../../../types/EDirection';
import { Badge, Button } from 'react-bootstrap';

import LabourInputObjectsActions from '../../../../../../../../redux/labour_input/objects/actions';
import { connect } from 'react-redux';
import ShowComponent from '../../../../../../../../../../components/ShowComponent';
import ObjectTimeInputComponent from './Object.TimeInput.Component';
import GroupHeaderNameComponent from './Group.Header.Name.Component';
import { RootState } from '../../../../../../../../../../state';

type ComponentProps = {
	show: boolean;
	groupAccordion: string | null;
	groupedObject: WorkersLog.LabourInput.Payload.Objects.WorkTimeGroupedObjects;
	setGroupedAccordion: React.Dispatch<React.SetStateAction<string | null>>;
};
const mapStateToProps = (state: RootState, componentProps: ComponentProps) => ({
	Selection: state.WorkersLog.LabourInput.Objects.Selection,
});

const mapDispatchToProps = {
	SelectObject: LabourInputObjectsActions.SelectObject,
	UngroupObjectsInit: LabourInputObjectsActions.UngroupObjectsInit,
};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & ComponentProps;

function GroupHeader(props: Props) {
	const decoratedOnClick = () =>
		props.setGroupedAccordion((prev) => (prev === props.groupedObject.id ? null : props.groupedObject.id));

	const ref = createRef<HTMLInputElement>();

	useEffect(() => {
		const objects = props.groupedObject.objects;
		if (ref.current) {
			const objectsIncludedInSelection = objects.filter(({ id }) => props.Selection.includes(parseInt(id)));
			if (objectsIncludedInSelection.length === 0) {
				ref.current.checked = false;
				ref.current.indeterminate = false;
			} else if (objectsIncludedInSelection.length === objects.length) {
				ref.current.checked = true;
				ref.current.indeterminate = false;
			} else {
				ref.current.checked = false;
				ref.current.indeterminate = true;
			}
		}
	}, [props.Selection]);

	function handleSelect() {
		props.SelectObject(props.groupedObject.objects.map((e) => parseInt(e.id)));
	}

	return (
		<tr className={classNames({ collapse: true, show: props.show })}>
			<td colSpan={3} className={'pl-3'}>
				<input className={'mr-2'} type="checkbox" ref={ref} onClick={handleSelect} />
				<ShowComponent when={props.groupedObject.objects.length > 1}>
					<ArrowIcon
						onClick={decoratedOnClick}
						direction={props.groupAccordion === props.groupedObject.id ? EDirection.Down : EDirection.Up}
					/>
				</ShowComponent>
				<GroupHeaderNameComponent groupedObject={props.groupedObject} />

				<ShowComponent when={props.groupedObject.objects.length > 1}>
					<Badge className={'ml-2'} variant={'info'}>
						{props.groupedObject.objects.length}
					</Badge>
				</ShowComponent>
				<Button
					className={'float-right'}
					size={'sm'}
					variant={'light'}
					onClick={() =>
						props.UngroupObjectsInit(
							props.groupedObject.id,
							props.groupedObject.objects.map((x) => parseInt(x.id)),
						)
					}>
					<small>
						<svg
							version="1.1"
							id="Layer_1"
							className={'mr-2'}
							width={'12px'}
							height={'12px'}
							viewBox="0 0 512 512">
							<g>
								<g>
									<g>
										<path
											d="M42.667,469.333H21.333C9.551,469.333,0,478.885,0,490.667S9.551,512,21.333,512h21.333
				C54.449,512,64,502.449,64,490.667S54.449,469.333,42.667,469.333z"
										/>
										<path
											d="M42.667,448v-21.333c0-11.782-9.551-21.333-21.333-21.333C9.551,405.333,0,414.885,0,426.667V448
				c0,11.782,9.551,21.333,21.333,21.333C33.115,469.333,42.667,459.782,42.667,448z"
										/>
										<path
											d="M42.667,0H21.333C9.551,0,0,9.551,0,21.333v21.333C0,54.449,9.551,64,21.333,64c11.782,0,21.333-9.551,21.333-21.333
				C54.449,42.667,64,33.115,64,21.333C64,9.551,54.449,0,42.667,0z"
										/>
										<path
											d="M149.333,469.333H128c-11.782,0-21.333,9.551-21.333,21.333S116.218,512,128,512h21.333
				c11.782,0,21.333-9.551,21.333-21.333S161.115,469.333,149.333,469.333z"
										/>
										<path
											d="M21.333,149.333c11.782,0,21.333-9.551,21.333-21.333v-21.333c0-11.782-9.551-21.333-21.333-21.333
				C9.551,85.333,0,94.885,0,106.667V128C0,139.782,9.551,149.333,21.333,149.333z"
										/>
										<path
											d="M448,42.667h21.333c11.782,0,21.333-9.551,21.333-21.333C490.667,9.551,481.115,0,469.333,0H448
				c-11.782,0-21.333,9.551-21.333,21.333C426.667,33.115,436.218,42.667,448,42.667z"
										/>
										<path
											d="M149.333,0H128c-11.782,0-21.333,9.551-21.333,21.333c0,11.782,9.551,21.333,21.333,21.333h21.333
				c11.782,0,21.333-9.551,21.333-21.333C170.667,9.551,161.115,0,149.333,0z"
										/>
										<path
											d="M21.333,256c11.782,0,21.333-9.551,21.333-21.333v-21.333c0-11.782-9.551-21.333-21.333-21.333
				C9.551,192,0,201.551,0,213.333v21.333C0,246.449,9.551,256,21.333,256z"
										/>
										<path
											d="M21.333,362.667c11.782,0,21.333-9.551,21.333-21.333V320c0-11.782-9.551-21.333-21.333-21.333
				C9.551,298.667,0,308.218,0,320v21.333C0,353.115,9.551,362.667,21.333,362.667z"
										/>
										<path
											d="M256,469.333h-21.333c-11.782,0-21.333,9.551-21.333,21.333S222.885,512,234.667,512H256
				c11.782,0,21.333-9.551,21.333-21.333S267.782,469.333,256,469.333z"
										/>
										<path
											d="M490.667,170.667c-11.782,0-21.333,9.551-21.333,21.333v21.333c0,11.782,9.551,21.333,21.333,21.333
				S512,225.115,512,213.333V192C512,180.218,502.449,170.667,490.667,170.667z"
										/>
										<path
											d="M490.667,384c-11.782,0-21.333,9.551-21.333,21.333v21.333c0,11.782,9.551,21.333,21.333,21.333S512,438.449,512,426.667
				v-21.333C512,393.551,502.449,384,490.667,384z"
										/>
										<path
											d="M490.667,64c-11.782,0-21.333,9.551-21.333,21.333v21.333c0,11.782,9.551,21.333,21.333,21.333S512,118.449,512,106.667
				V85.333C512,73.551,502.449,64,490.667,64z"
										/>
										<path
											d="M490.667,277.333c-11.782,0-21.333,9.551-21.333,21.333V320c0,11.782,9.551,21.333,21.333,21.333S512,331.782,512,320
				v-21.333C512,286.885,502.449,277.333,490.667,277.333z"
										/>
										<path
											d="M256,0h-21.333c-11.782,0-21.333,9.551-21.333,21.333c0,11.782,9.551,21.333,21.333,21.333H256
				c11.782,0,21.333-9.551,21.333-21.333C277.333,9.551,267.782,0,256,0z"
										/>
										<path
											d="M362.667,469.333h-21.333c-11.782,0-21.333,9.551-21.333,21.333S329.551,512,341.333,512h21.333
				c11.782,0,21.333-9.551,21.333-21.333S374.449,469.333,362.667,469.333z"
										/>
										<path
											d="M362.667,0h-21.333C329.551,0,320,9.551,320,21.333c0,11.782,9.551,21.333,21.333,21.333h21.333
				c11.782,0,21.333-9.551,21.333-21.333C384,9.551,374.449,0,362.667,0z"
										/>
										<path
											d="M469.333,469.333H448c-11.782,0-21.333,9.551-21.333,21.333S436.218,512,448,512h21.333
				c11.782,0,21.333-9.551,21.333-21.333S481.115,469.333,469.333,469.333z"
										/>
									</g>
								</g>
							</g>
						</svg>
						<span>Ungroup</span>
					</small>
				</Button>
			</td>
			<ObjectTimeInputComponent objectID={props.groupedObject.id} />
		</tr>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupHeader);
