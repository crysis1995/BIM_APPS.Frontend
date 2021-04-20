import { Button } from 'react-bootstrap';
import React from 'react';
import ExcelRaportGenerator from '../../../../../utils/ExcelRaportGenerator';
import { connect } from 'react-redux';
import { GetDelaysType } from '../../../../../services/graphql.api.service/CONSTANTS/Queries/GetDelays';

const mapStateToProps = (state: {
	Odbiory: { Delays: { MONOLITHIC: { delay_causes_all: { [key: string]: { id: number; name: string } } } } };
}) => ({
	all_delays: state.Odbiory.Delays.MONOLITHIC.delay_causes_all,
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> &
	typeof mapDispatchToProps & { filteredDelayCauses: GetDelaysType.AcceptanceDelay[] };

function GenerateExcelRaportButton(props: Props) {
	async function GenerateExcelRaport() {
		const excel = new ExcelRaportGenerator({ worksheet: 'Delays Raport' });
		excel.SetColumns(
			[
				{ key: 'id', header: 'ID' },
				{ key: 'user', header: 'Użytkownik', isCustomWidth: true },
				{ key: 'date', header: 'Data' },
				{ key: 'level', header: 'Poziom' },
				{ key: 'crane', header: 'Żuraw' },
				{ key: 'causes0', header: 'Przypadki' },
				{ key: 'causes1' },
				{ key: 'causes2' },
				{ key: 'commentary', header: 'Komentarz' },
			],
			['causes0', 'causes1', 'causes2'],
		);
		excel.SetData(
			props.filteredDelayCauses.map((delay) => {
				return {
					id: delay.id,
					user: delay.user.email,
					date: delay.date,
					level: delay.level?.name,
					crane: delay.crane?.name,
					causes0: props.all_delays[delay.causes[0]?.id]?.name,
					causes1: props.all_delays[delay.causes[1]?.id]?.name,
					causes2: props.all_delays[delay.causes[2]?.id]?.name,
					commentary: delay.commentary,
				};
			}),
		);
		await excel.GetRaport('Raport');
	}

	return (
		<Button variant={'primary'} size={'sm'} onClick={() => GenerateExcelRaport()}>
			Eksportuj do Excel
		</Button>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(GenerateExcelRaportButton);
