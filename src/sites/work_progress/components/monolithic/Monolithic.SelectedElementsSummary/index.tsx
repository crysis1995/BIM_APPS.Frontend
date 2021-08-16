import React from 'react';
import { RootState } from '../../../../../store';
import { connect } from 'react-redux';
import { SummaryGroupedObjectsSelector } from '../Monolithic.Results/Selectors/SummaryGroupedObjectsSelector';
import { Col } from 'react-bootstrap';
import { v4 } from 'uuid';
import { ObjectParams } from '../../../redux/utils/ObjectGroupClassifier';
import { ParamSummaryView } from './ParamSummaryView.Component';
import LocaleNameComponent from '../../../../../localisation/LocaleNameComponent';

const mapStateToProps = (state: RootState) => ({
	elements: SummaryGroupedObjectsSelector(state, { isFiltered: true }),
	elementsLength: state.WorkProgress.Monolithic.Upgrading.selectedElements.length,
});
const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function MonolithicSelectedElementsSummary(props: Props) {
	if (props.elementsLength === 0) return null;
	else
		return (
			<Col
				style={{ overflowY: 'auto', maxHeight: 200, minHeight: 200 }}
				className={'pt-3 d-flex flex-row border-top'}>
				{props.elements.map((item) => (
					<Col xs={3} key={v4()}>
						<h3>
							<LocaleNameComponent value={item.name} />
						</h3>
						{Object.entries(item.parameters).map(([paramName, paramValue]) => (
							<div key={v4()} className="font-weight-bold">
								<span className="mr-3">
									<LocaleNameComponent value={paramName as ObjectParams} />
								</span>
								<ParamSummaryView paramType={paramName as ObjectParams} paramValue={paramValue} />
							</div>
						))}
					</Col>
				))}
			</Col>
		);
}
export default connect(mapStateToProps, mapDispatchToProps)(MonolithicSelectedElementsSummary);
