import { graphQLClient } from "../../../../services";
import { gql } from "apollo-boost";

/**
 *
 *
 *
 * Funkcja zwraca jobs w postaci słownika
 *
 *
 *
 * jobs_id: {job}
 * @param jobs
 * @returns {*}
 */
export const prepareJobs = (jobs) => {
    return jobs.reduce((prev, acc) => {
        return {
            ...prev,
            [acc.id]: acc,
        };
    }, {});
};

/**
 *
 * @param job_id
 * @param objects
 * @param precision
 * @returns {{area_summary: number, object_ids: [], areas: [], job_key: *, value_percentage: number}}
 */
export const prepareDataForJobs = (job_id, objects, precision = 2) => {
    let areas = [];
    let object_ids = [];
    let area_summary = 0;
    let value_percentage = 0;
    Object.keys(objects).forEach((object_id) => {
        const isContainsJobId = objects[object_id].type_relation.jobs.reduce(
            (previous, job) => previous || job.id === job_id,
            false
        );

        if (isContainsJobId) {
            object_ids.push(object_id);
            if (objects[object_id].area) {
                area_summary += objects[object_id].area;
                areas.push(objects[object_id].area);
            }
            const job_entity = objects[object_id].objects_jobs.filter(
                (job) => job.odb_job.id === job_id
            )[0];
            if (job_entity && value_percentage < job_entity.value_percentage)
                value_percentage = job_entity.value_percentage;
        }
    });
    return {
        job_key: job_id,
        area_summary:
            Math.floor(area_summary * 10 ** precision) / 10 ** precision,
        areas,
        object_ids,
        value_percentage,
        area_computed:
            Math.floor(area_summary * value_percentage * 10 ** precision) /
            10 ** precision,
    };
};

export const createObjectJob = ({
    room,
    odb_job,
    value_percentage,
    value_area,
    type,
    user,
    object,
}) => {
    return graphQLClient.mutate({
        mutation: gql`
            mutation createObjectJobs(
                $r: ID
                $j: ID
                $vp: Float
                $va: Float
                $t: ID
                $us: String
                $obj: ID
            ) {
                createOdbObjectsJob(
                    input: {
                        data: {
                            room: $r
                            odb_job: $j
                            value_percentage: $vp
                            value_area: $va
                            type: $t
                            user: $us
                            object: $obj
                            isActual: true
                        }
                    }
                ) {
                    odbObjectsJob {
                        id
                    }
                }
            }
        `,
        variables: {
            r: room,
            j: odb_job,
            vp: value_percentage,
            va: value_area,
            t: type,
            us: user,
            obj: object,
        },
        fetchPolicy: "no-cache",
    });
};

export const updateObjectJob = (id) => {
    return graphQLClient.mutate({
        mutation: gql`
            mutation updateObjectJob($i: ID!) {
                updateOdbObjectsJob(
                    input: { where: { id: $i }, data: { isActual: false } }
                ) {
                    odbObjectsJob {
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

export const getAllObjectsJobs = (r, j) => {
    return graphQLClient.query({
        query: gql`
            query getAllObjectsJobs($r: ID, $j: ID) {
                odbObjectsJobs(
                    where: {
                        isActual: true
                        room: { id: $r }
                        odb_job: { id: $j }
                    }
                ) {
                    id
                }
            }
        `,
        variables: { r, j },
        fetchPolicy: "no-cache",
    });
};
