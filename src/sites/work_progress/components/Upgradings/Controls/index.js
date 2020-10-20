import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { JOB_TYPE } from '../../../redux/types/constans';

export default function Controls({ unit, onChange, disabled, value }) {
	switch (unit) {
		case JOB_TYPE.AREA:
			return <AreaUpgrading onChange={onChange} disabled={disabled} value={value} />;
		case JOB_TYPE.AMOUNT:
			return <AmountUpgrading onChange={onChange} disabled={disabled} value={value} />;
		default:
			return;
	}
}

/**
 *  UPGRADING AREA SELECTOR
 *
 * @param onChange {Function}
 * @param disabled {Boolean}
 * @param value {string | number}
 * @return {JSX.Element}
 * @constructor
 */
export function AreaUpgrading({ onChange, disabled, value }) {
	return (
		<Form.Control onChange={onChange} disabled={disabled} size={'sm'} as="select" value={value} custom>
			<option value="">Wybierz</option>
			<option value="0">0%</option>
			<option value="0.1">10%</option>
			<option value="0.2">20%</option>
			<option value="0.3">30%</option>
			<option value="0.4">40%</option>
			<option value="0.5">50%</option>
			<option value="0.6">60%</option>
			<option value="0.7">70%</option>
			<option value="0.8">80%</option>
			<option value="0.9">90%</option>
			<option value="1">100%</option>
		</Form.Control>
	);
}
/**
 *  UPGRADING AMOUNT SELECTOR
 *
 * @param onChange {Function}
 * @param disabled {Boolean}
 * @param value {Array<String | Number>}
 * @return {JSX.Element}
 * @constructor
 */
export function AmountUpgrading({ onChange = () => {}, disabled, value = [] }) {
	return (
		<Row noGutters={true}>
			<Col>
				<label>Wykonano</label>
				<input
					min={0}
					type={'number'}
					disabled={disabled}
					className="form-control form-control-sm"
					onChange={onChange}
					value={value[0] || 0}
				/>
			</Col>
			<Col className={'ml-1'}>
				<label>Wszystkich</label>
				<input
					min={0}
					type={'number'}
					disabled={disabled}
					className="form-control form-control-sm"
					onChange={onChange}
					value={value[1] || 0}
				/>
			</Col>
		</Row>
	);
}
