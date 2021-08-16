import React from 'react';
import { Col } from 'react-bootstrap';
import Viewer from '../../../../components/ForgeViewer/components';
import Table from './Table';
import jsondata from './data.json';
import { Column } from 'react-table';
import { RoundNumber } from '../../../../utils/RoundNumber';
import { connect } from 'react-redux';
import { RootState } from '../../../../store';
import Loader from '../../../../components/Loader';
import { createSelector } from 'reselect';
import { EApplicationsWithModules } from '../../../types';


export interface RowData {
	id: number;
	description: string;
	shape: number;
	mass: number;
	diameter: number;
	count: number;
	level: string;
}

type Texts = 'typ' | 'element' | 'kształt' | 'pręt' | 'poziom';

function TextVariation(count: number, baseText: Texts) {
	let text = '';
	if (count < 2) text += baseText;
	else if (count < 5) text += baseText + 'y';
	else text += baseText + 'ów';
	return text;
}

const selectedForgeElementSelector = createSelector(
	(state: RootState) => state.ForgeViewer.selected_elements,
	(state: RootState) => state.ForgeViewer.model_elementsByForgeID,
	(selected_elements, model_elementsByForgeID) => {
		if (!model_elementsByForgeID) return [];
		else {
			return selected_elements.map((id) => model_elementsByForgeID[id]);
		}
	},
);

const mapStateToProps = (state: RootState) => ({
	isModelElementsLoading: state.ForgeViewer.model_elements_loading,
	modelElements: state.ForgeViewer.model_elements,
	selectedForgeElement: selectedForgeElementSelector(state),
});

const mapDispatchToProps = {};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function ReinforcementComponent(props: Props) {
	const data = React.useMemo(
		() =>
			jsondata
				.map<RowData>((item) => ({
					level: props.modelElements?.[item.ID]?.levelName || '',
					id: item.ID,
					description: item.Opis,
					count: item['Ilość'],
					diameter: item['Średnica'],
					mass: item['Masa [kg]'],
					shape: item['Kod kształtu'],
				}))
				.filter(
					(item) => props.selectedForgeElement.length !== 0 && props.selectedForgeElement.includes(item.id),
				),
		[props.modelElements, props.selectedForgeElement],
	);
	const columns: Column<RowData>[] = React.useMemo(
		() => [
			{
				Header: 'Info',
				columns: [
					{
						Header: 'Revit ID',
						accessor: 'id',
						aggregate: 'uniqueCount',
						Aggregated: (props) => `${props.value} ${TextVariation(props.value, 'element')}`,
					},
					{
						Header: 'Poziom',
						accessor: 'level',
						aggregate: 'uniqueCount',
						Aggregated: (props) => `${props.value} ${TextVariation(props.value, 'poziom')}`,
					},
					{
						Header: 'Opis',
						accessor: 'description',
						aggregate: 'uniqueCount',
						Aggregated: (props) => `${props.value} ${TextVariation(props.value, 'typ')} elementów`,
					},
					{
						Header: 'Kod kształtu',
						accessor: 'shape',
						aggregate: 'uniqueCount',
						Aggregated: (props) => `${props.value} ${TextVariation(props.value, 'kształt')}`,
					},
					{
						Header: 'Masa [kg]',
						accessor: 'mass',
						Cell: (props) => RoundNumber(props.value, 2).toString(),
						aggregate: 'sum',
						Aggregated: (props) => `${RoundNumber(props.value, 2)} [kg]`,
					},
					{
						Header: 'Średnica',
						accessor: 'diameter',
						aggregate: 'uniqueCount',
						Aggregated: (props) => `${props.value} ${TextVariation(props.value, 'element')}`,
					},
					{
						Header: 'Ilość',
						accessor: 'count',
						aggregate: 'sum',
						Aggregated: (props) => `${props.value} ${TextVariation(props.value, 'pręt')}`,
					},
				],
			},
		],
		[],
	);

	if (props.isModelElementsLoading) return <Loader />;
	return (
		<>
			<Col xs={6}>
				<div className="d-flex align-items-stretch" style={{ height: '100%' }}>
					<Viewer runBy={EApplicationsWithModules.CONSTRUCTION_MATERIALS_REINFORCEMENT} />
				</div>
			</Col>
			<Col xs={6}>
				{/*<div >*/}
				<Table columns={columns} data={data} />
				{/*</div>*/}
			</Col>
		</>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReinforcementComponent);
