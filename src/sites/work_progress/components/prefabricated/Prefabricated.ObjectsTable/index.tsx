import React, { useEffect, useRef } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { RootState } from '../../../../../store';
import { connect } from 'react-redux';
import LoaderComponent from '../../../../../components/Loader/LoaderComponent';
import './table.scss';

const style = {
	input: { width: 50 },
	revitID: { width: 100 },
	dipCode: { width: 'auto' },
	projectNumber: { width: 'auto' },
};

const mapStateToProps = (state: RootState) => ({
	objects: state.WorkProgress.Prefabricated.Objects.byRevitID
		? Object.values(state.WorkProgress.Prefabricated.Objects.byRevitID)
		: [],
	dataLoading:
		state.WorkProgress.Prefabricated.Objects.statusesLoading ||
		state.WorkProgress.Prefabricated.Objects.objectsLoading,
});
const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
function PrefabricatedObjectsTable(props: Props) {
	return (
		<LoaderComponent loading={props.dataLoading}>
			<Row>
				<Col xs={12}>
					<Table size={'sm'} className={'table-class'}>
						<thead>
							<tr className={'tr-class'}>
								<th style={style.input}>
									<Input />
								</th>
								<th style={style.revitID}>Revit ID</th>
								<th style={style.dipCode}>Kod DIP</th>
								<th style={style.projectNumber}>Numer projektowy</th>
							</tr>
						</thead>
						<tbody className={'tbody-class'}>
							{props.objects.map((value, ind) => (
								<tr className={'tr-class'} key={ind}>
									<td style={style.input}>
										<Input />
									</td>
									<td style={style.revitID}>{value.revit_id}</td>
									<td style={style.dipCode}>{value.DIPCode}</td>
									<td style={style.projectNumber}>{value.ProjectNumber}</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Col>
			</Row>
		</LoaderComponent>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(PrefabricatedObjectsTable);

function Input(props: { checked?: boolean; indeterminate?: boolean; OnClick?: () => void }) {
	const ref = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (ref.current) {
			ref.current.indeterminate = props.indeterminate || false;
			ref.current.checked = props.checked || false;
		}
	}, [props.checked, ref]);

	function HandleClick() {
		if (props.OnClick) props.OnClick();
	}

	return <input type="checkbox" onClick={HandleClick} ref={ref} />;
}
