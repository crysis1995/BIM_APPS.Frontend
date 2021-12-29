import React from 'react';

import { SummaryGroupedObjectsSelector } from '../../Selectors/SummaryGroupedObjectsSelector';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';
import { v4 } from 'uuid';
import LocaleNameComponent from '../../../../../../../localisation/LocaleNameComponent';
import { ObjectParams } from '../../../../../redux/utils/ObjectGroupClassifier';
import { ParamSummaryView } from '../../../Monolithic.SelectedElementsSummary/ParamSummaryView.Component';
import { RootState } from '../../../../../../../state';

const mapStateToProps = (state: RootState) => ({
	elements: SummaryGroupedObjectsSelector(state, { isFiltered: false }),
});
const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

function ComponentSelectedElementPropsSummary(props: Props) {
	return (
		<>
			{props.elements.map((item) => (
				<Col className="py-3" xs={6} key={v4()}>
					<h6>
						<LocaleNameComponent value={item.name} />
					</h6>
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
		</>
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(ComponentSelectedElementPropsSummary);
