import { RoundNumber } from '../../../../utils/RoundNumber';
import { JOB_TYPE } from '../types/constans';

export const prepUpgradingDataToSet = (job_id, object) => {
	let particular_values = []; // tablica powierzchni cząstkowych
	let object_ids = []; // tablica id obiektów
	let summary_value = 0; // wartość sumarycznej powierzchni
	let percentage_value = 0; // wartość procentowa zaawansowania danej roboty
	let reference_job = null; // id referencejobs - referencji przechowującej aktualny stan w bazie danych
	let current_value = 0;
	for (let object_id in object) {
		if (!object.hasOwnProperty(object_id)) continue;
		const isContainsJobId = object[object_id].object_finish_type.jobs.reduce(
			(previous, job) => previous || job.id === job_id,
			false,
		);
		if (isContainsJobId) {
			// dodaje id obiektów
			object_ids.push(object_id);

			// jeśli w obiekcie jest area
			if (object[object_id].hasOwnProperty('area') && object[object_id].area) {
				summary_value += object[object_id].area; // do klucza revit_id dodaje wartność powierzchni danego obiektu
				particular_values.push(object[object_id].area);
			}
			//
			//      pobieram reference_jobs dla danych obiektów
			//
			const ref_job = object[object_id].reference_jobs.filter((ref_job) => ref_job.job.id === job_id)[0];
			if (ref_job && percentage_value < ref_job.percentage_value) {
				percentage_value = ref_job.percentage_value;
				reference_job = { id: ref_job.id };
			}
		}
	}
	summary_value = RoundNumber(summary_value);
	if (summary_value > 0 && percentage_value > 0) current_value = RoundNumber(summary_value * percentage_value);
	return {
		summary_value,
		particular_values,
		object_ids,
		reference_job,
		percentage_value,
		current_value,
	};
};
/**
 *
 * @param job {Object}
 * @param objects {Array<Object>}
 * @param reference_jobs {Array<Object>}
 * @return {{object_ids: [], percentage_value: number, summary_value: number, reference_job: null, particular_values: [], current_value: number}}
 */
// export const prepUpgradingDataToSetv2 = (job, objects, reference_jobs) => {
// 	let job_id = job.id;
// 	let particular_values = []; // tablica powierzchni cząstkowych
// 	let object_ids = []; // tablica id obiektów
// 	let summary_value = 0; // wartość sumarycznej powierzchni
// 	let percentage_value = 0; // wartość procentowa zaawansowania danej roboty
// 	let reference_job = null; // id referencejobs - referencji przechowującej aktualny stan w bazie danych
// 	let current_value = 0;
// 	let is_occurr = true;
// 	if ( job.unit === JOB_TYPE.AREA ){
// 		for (let object of objects) {
//
// 			const isContainsJobId = object.object_finish_type.jobs.reduce(
// 				(previous, job) => previous || job.id === job_id,
// 				false,
// 			);
// 			if (isContainsJobId) {
// 				// dodaje id obiektów
// 				object_ids.push(object_id);
//
// 				// jeśli w obiekcie jest area
// 				if (object.hasOwnProperty('area') && object.area) {
// 					summary_value += object.area; // do klucza revit_id dodaje wartność powierzchni danego obiektu
// 					particular_values.push(object.area);
// 				}
// 				//
// 				//      pobieram reference_jobs dla danych obiektów
// 				//
// 				const ref_job = object.reference_jobs.filter((ref_job) => ref_job.job.id === job_id)[0];
// 				if (ref_job && percentage_value < ref_job.percentage_value) {
// 					percentage_value = ref_job.percentage_value;
// 					reference_job = { id: ref_job.id };
// 				}
// 			}
// 		}
// 		summary_value = RoundNumber(summary_value);
// 		if (summary_value > 0 && percentage_value > 0) current_value = RoundNumber(summary_value * percentage_value);
// 		return {
// 			summary_value,
// 			particular_values,
// 			object_ids,
// 			reference_job,
// 			percentage_value,
// 			current_value,
// 		};
// 	}
//
// };


// function makeDateTo