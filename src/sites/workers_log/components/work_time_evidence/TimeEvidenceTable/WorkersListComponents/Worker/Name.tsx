import { connect } from 'react-redux';
import React from 'react';

import WorkersLog from '../../../../../types';
import { RootState } from '../../../../../../../state';

const mapStateToProps = (state: RootState) => ({
	workers: state.WorkersLog.WorkTimeEvidence.Workers.all,
	warbud_workers_map: state.WorkersLog.WorkTimeEvidence.Workers.warbud_workers_map,
});
const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { dbID: string };

function GetWorkerName(
	worker: WorkersLog.WorkTimeEvidence.Worker.Payload.WorkerPayload,
	warbud_workers_map: { [p: string]: WorkersLog.WorkTimeEvidence.Worker.Payload.IWarbudWorkerMapData },
) {
	if (worker.is_house_worker) {
		if (worker.warbud_id) return warbud_workers_map[worker.warbud_id].Nazwa;
		else return 'BRAK WARBUD ID';
	} else {
		return worker.name || worker.id;
	}
}

function Name(props: Props) {
	if (props.dbID && props.workers && props.workers[props.dbID] && props.warbud_workers_map) {
		const worker = props.workers[props.dbID];
		return <span>{GetWorkerName(worker, props.warbud_workers_map)}</span>;
	}
	return null;
}

export default connect(mapStateToProps, mapDispatchToProps)(Name);
