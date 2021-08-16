import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import React from 'react';
import { v4 } from 'uuid';

function ComponentTermsTableHeader() {
	return (
		<thead>
			<tr>
				<th>Typ</th>
				<th>Żuraw</th>
				<OverlayTrigger
					key={v4()}
					placement="top"
					overlay={
						<Tooltip id={'88510d1a-9abd-4dd7-8218-64b1eb66e3ad'}>
							Data planowanego rozpoczęcia wg. planu bazowego
						</Tooltip>
					}>
					<th>Data planowanego rozpoczęcia wg. PB</th>
				</OverlayTrigger>
				<OverlayTrigger
					key={v4()}
					placement="top"
					overlay={
						<Tooltip id={'c8737d54-cf8b-47c3-a2a6-b69802f044ae'}>Data rzeczywistego rozpoczęcia</Tooltip>
					}>
					<th>Data rzeczywistego rozpoczęcia</th>
				</OverlayTrigger>
				<OverlayTrigger
					key={v4()}
					placement="top"
					overlay={
						<Tooltip id={'cdd9d5eb-d2a1-4aea-b7a0-985a256f55c1'}>
							Data planowanego zakończenia wg. planu bazowego
						</Tooltip>
					}>
					<th>Data planowanego zakończenia wg. PB</th>
				</OverlayTrigger>
				<OverlayTrigger
					key={v4()}
					placement="top"
					overlay={<Tooltip id={'3d6879f7-e5ae-4198-805b-2c11041c1d08'}>Planowana data zakończenia</Tooltip>}>
					<th>Planowana data zakończenia</th>
				</OverlayTrigger>
			</tr>
		</thead>
	);
}
export default ComponentTermsTableHeader;
