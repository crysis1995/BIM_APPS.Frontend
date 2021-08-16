import { WORKERS_LOG__WORKERS_TYPE } from '../../../../../../services/graphql.api.service/CONSTANTS/GeneralTypes';
import { Col, Form } from 'react-bootstrap';
import { DefaultParameterInput } from './DefaultParameterInput';
import { SelectParameterInput } from './SelectParameterInput';
import { InputParameterComponent } from './InputParameterComponent';
import React from 'react';
import { ElementType } from './types';

export function LabourInputDescriptionForm({
	crewType,
	elementType = ElementType.Wall,
}: // object,
{
	crewType: WORKERS_LOG__WORKERS_TYPE | null;
	elementType: ElementType | null;
	// object: {
	// 	[key in ParameterType]?: key extends ParameterType.CharacteristicParameters
	// 		? { [key in CharacteristicParametersChild]?: string | number }
	// 		: string | number;
	// };
}) {
	// object = {
	// 	[ParameterType.Element]: 'epic.__test__',
	// 	[ParameterType.TimeInput]: 5.5,
	// 	[ParameterType.CharacteristicParameters]: {
	// 		[CharacteristicParametersChild.Height]: 12,
	// 		[CharacteristicParametersChild.Level]: 'B03',
	// 	},
	// };
	if (!crewType || !elementType) return <></>;
	return (
		<Col className={'pt-3'}>
			<Form.Row>
				<Col>
					<DefaultParameterInput value={'TEST'} title={'Element'} ParentOrderNumber={1} />
				</Col>
				<Col>
					<SelectParameterInput title={'Opis podstawowy'} options={[]} ParentOrderNumber={2} />
				</Col>
				<Col>
					<InputParameterComponent title={'Opis dodatkowy'} ParentOrderNumber={3} />
				</Col>
			</Form.Row>
			<Form.Group className={'mt-3'}>
				<Form.Label>
					<strong>4.</strong> Parametry charakterystyczne
				</Form.Label>
				<Form.Row className={'border p-2'}>
					<Col>
						<DefaultParameterInput
							value={'3 m'}
							title={'Wysokość'}
							ParentOrderNumber={4}
							ChildOrderNumber={1}
						/>
					</Col>
					<Col>
						<DefaultParameterInput
							value={'specyficzna'}
							title={'Specyfika'}
							ParentOrderNumber={4}
							ChildOrderNumber={2}
						/>
					</Col>

					<Col>
						<DefaultParameterInput
							value={'zwykle'}
							title={'Wykończenie'}
							ParentOrderNumber={4}
							ChildOrderNumber={3}
						/>
					</Col>
					<Col>
						<DefaultParameterInput
							value={'L03'}
							title={'Kondygnacja'}
							ParentOrderNumber={4}
							ChildOrderNumber={4}
						/>
					</Col>
				</Form.Row>
			</Form.Group>
			<Form.Row>
				<Col>
					<DefaultParameterInput value={5.5} title={'Nakład pracy [w godzinach]'} ParentOrderNumber={5} />
				</Col>
			</Form.Row>
		</Col>
	);
}
