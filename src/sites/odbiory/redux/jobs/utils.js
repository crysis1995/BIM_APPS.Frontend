import { graphQLClient } from "../../../../services";
import { gql } from "apollo-boost";
import {
  fetchALLAreaJobPerLevel,
  fetchSummaryAreaJobPerLevel,
} from "../objects/utils";

export const fetchAllJobsFromAPI = () => {
  return graphQLClient.query({
    query: gql`
      query getAllAcceptanceJobs {
        acceptanceJobs {
          id
          name
          unit
        }
      }
    `,
    fetchPolicy: "no-cache",
  });
};

export const addParameterWithValue = (
  objects,
  param_name = "",
  condition = () => {}
) => {
  if (!param_name) return objects;
  let newObj = { ...objects };
  for (let key in newObj) {
    newObj[key] = { ...newObj[key], [param_name]: condition(newObj[key]) };
  }
  return newObj;
};

/**
 *      Przygotowuje pobrane dane wg klucza
 *      job:{
 *          id:{
 *              ...
 *              upgrading: {
 *  	            summary_value: 0,
 *  		        particular_values: [],
 *  		        object_ids: [],
 *  		        current_value: 0,
 *  		        percentage_value: 0,
 *  		        reference_job_id: null,
 *              },
 *          }
 *      }
 *
 * @param job_id
 * @param objects
 * @param precision
 * @returns {{summary_value: number, object_ids: [], particular_values: [], job_key: *, percentage_value: number}}
 */
export const prepareDataForJobs = (job_id, objects, precision = 2) => {
  let particular_values = []; // tablica powierzchni cząstkowych
  let object_ids = []; // tablica id obiektów
  let summary_value = 0; // wartość sumarycznej powierzchni
  let percentage_value = 0; // wartość procentowa zaawansowania danej roboty
  let reference_job = null; // id referencejobs - referencji przechowującej aktualny stan w bazie danych
  let current_value = 0;
  for (let object_id in objects) {
    //
    // iteruje po obiektach i sprawdzam, czy jakis obiekt zawiera daną robote
    //
    const isContainsJobId = objects[object_id].object_finish_type.jobs.reduce(
      (previous, job) => previous || job.id === job_id,
      false
    );

    if (isContainsJobId) {
      // dodaje id obiektów
      object_ids.push(object_id);
      if (objects[object_id].area) {
        // jeśli w obiekcie jest area
        summary_value += objects[object_id].area;
        particular_values.push(objects[object_id].area);
      }
      //
      //      pobieram reference_jobs dla danych obiektów
      //
      const ref_job = objects[object_id].reference_jobs.filter(
        (ref_job) => ref_job.job.id === job_id
      )[0];
      if (ref_job && percentage_value < ref_job.percentage_value) {
        percentage_value = ref_job.percentage_value;
        reference_job = { id: ref_job.id };
      }
    }
  }
  summary_value = Math.floor(summary_value * 10 ** precision) / 10 ** precision;
  current_value =
    Math.floor(summary_value * percentage_value * 10 ** precision) /
    10 ** precision;

  return {
    summary_value,
    particular_values,
    object_ids,
    reference_job,
    percentage_value,
    current_value,
  };
};

export const createReferenceJob = ({
  room,
  job,
  percentage_value,
  value_area,
  object_type,
  user,
  objects,
}) => {
  return graphQLClient.mutate({
    mutation: gql`
      mutation createAcceptanceReferenceJob(
        $r: ID
        $j: ID
        $vp: Float
        $vc: Float
        $ot: ID
        $o: [ID]
        $u: ID
      ) {
        createAcceptanceReferenceJob(
          input: {
            data: {
              percentage_value: $vp
              value_calculated: $vc
              room: $r
              job: $j
              object_type: $ot
              user: $u
              objects: $o
            }
          }
        ) {
          acceptanceReferenceJob {
            id
            room {
              revit_id
            }
          }
        }
      }
    `,
    variables: {
      r: room,
      j: job,
      vp: percentage_value,
      vc: value_area,
      ot: object_type,
      u: user,
      o: objects,
    },
    fetchPolicy: "no-cache",
  });
};

export const updateObjectJob = (id) => {
  return graphQLClient.mutate({
    mutation: gql`
      mutation updateReferenceJob($i: ID!) {
        updateAcceptanceReferenceJob(
          input: { where: { id: $i }, data: { is_actual: false } }
        ) {
          acceptanceReferenceJob {
            id
          }
        }
      }
    `,
    variables: {
      i: id,
    },
    fetchPolicy: "no-cache",
  });
};

export const fetchSummaryValuesByJob = async (
  job_id,
  current_level,
  precision
) => {
  return new Promise((resolve, reject) => {
    var summary_all_value;
    var summary_current_value;
    var percentage_value;
    var elements;
    Promise.all([
      fetchALLAreaJobPerLevel(job_id, current_level),
      fetchSummaryAreaJobPerLevel(job_id, current_level),
    ]).then((resp) => {
      if (resp[0].data)
        summary_all_value =
          Math.floor(
            (resp[0].data.acceptanceObjectsConnection.aggregate.sum.area || 0) *
              10 ** precision
          ) /
          10 ** precision;
      if (resp[1].data) {
        summary_current_value =
          Math.floor(
            (resp[1].data.acceptanceReferenceJobsConnection.aggregate.sum
              .value_calculated || 0) *
              10 ** precision
          ) /
          10 ** precision;
        elements = resp[1].data.acceptanceReferenceJobsConnection.values.reduce(
          (prev, acc) => ({
            ...prev,
            [acc.room.revit_id]: acc.percentage_value,
          }),
          {}
        );
      }

      percentage_value =
        Math.floor(
          (summary_current_value / summary_all_value) * 100 * 10 ** precision
        ) /
        10 ** precision;
      resolve({
        summary_all_value,
        summary_current_value,
        percentage_value,
        elements,
      });
      reject(new Error("Coś poszło nie tak"));
    });
  });
};
