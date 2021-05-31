import { CrewState } from '../../../../../redux/work_time_evidence/crew/types/state';
import { WorkersState } from '../../../../../redux/work_time_evidence/worker/types/state';
import { connect } from 'react-redux';
import { IWarbudWorkerMapData, WorkerPayload } from '../../../../../redux/work_time_evidence/worker/types/payload';
import React from 'react';

const mapStateToProps = (state: { WorkersLog: { WorkTimeEvidence: { Crews: CrewState; Workers: WorkersState } } }) => ({
	workers: state.WorkersLog.WorkTimeEvidence.Workers.all,
	warbud_workers_map: state.WorkersLog.WorkTimeEvidence.Workers.warbud_workers_map,
});
const mapDispatchToProps = {};
type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & { dbID: string };

function GetWorkerName(worker: WorkerPayload, warbud_workers_map: { [p: string]: IWarbudWorkerMapData }) {
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
