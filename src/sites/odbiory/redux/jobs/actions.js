import { graphQLClient } from "../../../../services";
import { gql } from "apollo-boost";
import { createObjectJob, getAllObjectsJobs, prepareDataForJobs, prepareJobs, updateObjectJob } from "./utils";

export const JOBS_LOADING_START = "JOBS_LOADING_START";
export const JOBS_LOADING_END = "JOBS_LOADING_END";

export const ALL_JOBS_FETCH_START = "ALL_JOBS_FETCH_START";
export const ALL_JOBS_FETCH_END = "ALL_JOBS_FETCH_END";
export const ALL_JOBS_FETCH_ERROR = "ALL_JOBS_FETCH_ERROR";

export const JOBS_SET_DATA = "JOBS_SET_DATA";
export const JOBS_CHANGE_PERCENTAGE_VALUE = "JOBS_CHANGE_PERCENTAGE_VALUE";

export const JOBS_CLEAN_DATA_OF_JOB = "JOBS_CLEAN_DATA_OF_JOB";

export const OBJECT_JOB_FETCH_START = "OBJECT_JOB_FETCH_START";
export const OBJECT_JOB_FETCH_ERROR = "OBJECT_JOB_FETCH_ERROR";
export const OBJECT_JOB_FETCH_COMPLETED = "OBJECT_JOB_FETCH_COMPLETED";

const jobsLoadingStart = () => ({
    type: JOBS_LOADING_START,
});

const jobsLoadingEnd = () => ({
    type: JOBS_LOADING_END,
});

const jobsFetchStart = () => ({
    type: ALL_JOBS_FETCH_START,
});

const jobsFetchEnd = (jobs) => ({
    type: ALL_JOBS_FETCH_END,
    jobs,
});

const jobsFetchError = (jobs_errors) => ({
    type: ALL_JOBS_FETCH_ERROR,
    jobs_errors,
});

const objectJobFetchStart = () => ({
    type: OBJECT_JOB_FETCH_START,
});

// const objectJobFetchError = (errors) => ({
//     type: OBJECT_JOB_FETCH_ERROR,
//     errors,
// });

const objectJobFetchCompleted = () => ({
    type: OBJECT_JOB_FETCH_COMPLETED,
});

const setJobsData = ({ job_key, area_summary, areas, object_ids, value_percentage, area_computed }) => ({
    type: JOBS_SET_DATA,
    job_key,
    area_summary,
    areas,
    object_ids,
    value_percentage,
    area_computed,
});

const jobsChangePercentageValue = ({ job_key, value_percentage, area_computed }) => ({
    type: JOBS_CHANGE_PERCENTAGE_VALUE,
    job_key,
    value_percentage,
    area_computed,
});

const setJobInitial = () => ({
    type: JOBS_CLEAN_DATA_OF_JOB,
});

export const fetchAllJobs = () => async (dispatch) => {
    dispatch(jobsFetchStart());
    const { data, errors } = await graphQLClient.query({
        query: gql`
            query {
                odbJobs {
                    name
                    id
                }
            }
        `,
    });
    if (data) {
        console.log(prepareJobs(data.odbJobs));
        dispatch(jobsFetchEnd(prepareJobs(data.odbJobs)));
    }
    if (errors) {
        dispatch(jobsFetchError(errors));
    }
};

export const jobsPrepare = (objects) => (dispatch, getState) => {
    dispatch(jobsLoadingStart());
    dispatch(setJobInitial());
    const { jobs } = getState().Odbiory.Jobs;

    if (Object.keys(jobs).length > 0) {
        Object.keys(jobs).forEach((key) => {
            dispatch(setJobsData(prepareDataForJobs(key, objects)));
        });
    }
    dispatch(jobsLoadingEnd());
};

export const changeJobPercentageValue = (job_key, value, precision = 2) => async (dispatch, getState) => {
    const { jobs, objects_jobs_loading } = getState().Odbiory.Jobs;
    const job = jobs[job_key];
    const { objects } = getState().Odbiory.Objects;
    const { selected_room } = getState().Odbiory.Rooms;
    const { user } = getState().AutodeskLogin;

    if (selected_room && !objects_jobs_loading) {
        dispatch(objectJobFetchStart());
        getAllObjectsJobs(selected_room, job_key)
            .then(({ data, errors }) => {
                if (errors) return;
                return Promise.all(data.odbObjectsJobs.map((e) => updateObjectJob(e.id)));
            })
            .then((a) => {
                return Promise.all(
                    job.object_ids.map((obj_id) =>
                        createObjectJob({
                            room: selected_room,
                            odb_job: job_key,
                            value_percentage: value,
                            value_area: Math.floor(objects[obj_id].area * value * 10 ** precision) / 10 ** precision,
                            type: objects[obj_id].type_relation.id,
                            user: user.userName,
                            object: obj_id,
                        })
                    )
                );
            })
            .then(() => {
                dispatch(
                    jobsChangePercentageValue({
                        job_key,
                        value_percentage: value || 0,
                        area_computed: value
                            ? Math.floor(job.area_summary * value * 10 ** precision) / 10 ** precision
                            : 0,
                    })
                );
                dispatch(dispatch(objectJobFetchCompleted()));
            });
    }
};
