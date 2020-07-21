import { graphQLClient } from "../../../services";
import { gql } from "apollo-boost";
import { initialiseModal } from "../../Modal/redux/actions";

//          TYPES
export const ODBIORY_COMPONENT_STARTED = "ODBIORY_COMPONENT_STARTED";

/*  rooms   */
export const ROOMS_LOADING_START = "ROOMS_LOADING_START";
export const ROOMS_LOADING_ERROR = "ROOMS_LOADING_ERROR";
export const ROOMS_LOADING_END = "ROOMS_LOADING_END";
export const ODBIORY_SET_SELECTED_ROOM = "ODBIORY_SET_SELECTED_ROOM";

const fetchRoomsStart = () => ({
    type: ROOMS_LOADING_START,
});

const fetchRoomsError = (errors) => ({
    type: ROOMS_LOADING_ERROR,
    errors,
});

const fetchRoomsEnd = (rooms) => ({
    type: ROOMS_LOADING_END,
    rooms,
});

/*  objects */
export const OBJECTS_LOADING_START = "OBJECTS_LOADING_START";
export const OBJECTS_LOADING_ERROR = "OBJECTS_LOADING_ERROR";
export const OBJECTS_LOADING_END = "OBJECTS_LOADING_END";

const fetchObjectsStart = () => ({
    type: OBJECTS_LOADING_START,
});

const fetchObjectsError = (errors) => ({
    type: OBJECTS_LOADING_ERROR,
    errors,
});

const fetchObjectsEnd = (jobs, objects) => ({
    type: OBJECTS_LOADING_END,
    jobs,
    objects,
});

export const OBJECTS_JOBS_SAVING_START = "OBJECTS_JOBS_SAVING_START";
export const OBJECTS_JOBS_SAVING_ERROR = "OBJECTS_JOBS_SAVING_ERROR";
export const OBJECTS_JOBS_SAVING_END = "OBJECTS_JOBS_SAVING_END";

const objectsJobsSavingStart = () => ({
    type: OBJECTS_JOBS_SAVING_START,
});

const objectsJobsSavingError = (errors) => ({
    type: OBJECTS_JOBS_SAVING_ERROR,
    errors,
});

const objectsJobsSavingEnd = (data) => ({
    type: OBJECTS_JOBS_SAVING_END,
    data,
});

export const ODBIORY_FETCH_ERROR = "ODBIORY_FETCH_ERROR";
export const ODBIORY_SET_JOB_DONE_VALUE = "ODBIORY_SET_JOB_DONE_VALUE";
export const ODBIORY_SET_JOBS_AND_OBJECTS = "ODBIORY_SET_JOBS_AND_OBJECTS";
export const ODBIORY_SAVE_CHANGES = "ODBIORY_SAVE_CHANGES";
export const ODBIORY_CLEAN_CHANGES = "ODBIORY_CLEAN_CHANGES";
export const ODBIORY_JOB_CHANGED = "ODBIORY_JOB_CHANGED";
export const ODBIORY_SAVED_PROPERLY = "ODBIORY_SAVED_PROPERLY";

// export const ODBIORY_SET_

//          ACTIONS
export const componentStarted = () => ({
    type: ODBIORY_COMPONENT_STARTED,
});

const selectedRoom = (selected_room) => ({
    type: ODBIORY_SET_SELECTED_ROOM,
    selected_room,
});

const savedProperly = () => ({
    type: ODBIORY_SAVED_PROPERLY,
});
const cleanChangedJobs = (jobs) => ({
    type: ODBIORY_CLEAN_CHANGES,
    jobs,
});

export const setJobDoneValue = (key, value) => ({
    type: ODBIORY_SET_JOB_DONE_VALUE,
    key,
    value,
});

export const fetch_all_rooms = () => async (dispatch) => {
    dispatch(fetchRoomsStart());
    const query = gql`
        query getAllRooms($s: Int) {
            odbRoomsConnection(sort: "room_number:ASC", start: $s) {
                values {
                    id
                    revit_id
                    room_name
                    room_number
                }
                aggregate {
                    count
                    totalCount
                }
            }
        }
    `;
    var rooms = [];
    var s = 0;
    var max;
    while (true) {
        if (rooms.length === max) {
            break;
        }
        const { data, errors } = await graphQLClient.query({
            query,
            variables: { s },
        });
        if (data) {
            rooms = rooms.concat(data.odbRoomsConnection.values);
            max = data.odbRoomsConnection.aggregate.totalCount;
            s = s + 100;
        }
        if (errors) {
            dispatch(fetchRoomsError(errors));
            break;
        }
    }

    dispatch(fetchRoomsEnd(rooms));
};

const fetchObjectsByRoom = () => async (dispatch, getState) => {
    dispatch(fetchObjectsStart());
    const query = gql`
        query getFilteredObjects($r: ID!) {
            odbObjects(where: { room: $r }) {
                id
                area
                type_relation {
                    id
                    name
                    jobs {
                        name
                        id
                    }
                }
                objects_jobs(where: { isActual: true }) {
                    value_percentage
                    type {
                        id
                        name
                    }
                    odb_job {
                        id
                        name
                    }
                    id
                }
            }
        }
    `;
    try {
        const { data, errors } = await graphQLClient.query({
            query,
            variables: { r: getState().RoomsReducer.selected_room },
        });
        if (data) {
            const jobs = getJobsFormObjects(data.odbObjects);
            const objects = data.odbObjects;
            dispatch(fetchObjectsEnd(jobs, objects));
        }
        if (errors) {
            dispatch(fetchObjectsError(errors));
        }
    } catch (e) {
        console.error(e);
    }
};

const groupObjectByType = (objects) => {
    var uniqueTypes = [
        ...new Set(
            objects.reduce(
                (prev, acc) => [
                    ...prev,
                    ...acc.type_relation.jobs.reduce(
                        (pre, curr) => [...pre, curr.id],
                        []
                    ),
                ],
                []
            )
        ),
    ];

    return uniqueTypes.reduce((prev, acc) => {
        return {
            ...prev,
            [acc]: objects.reduce((previous, current) => {
                const filteredValue = !!current.type_relation.jobs.filter(
                    (job) => job.id === acc
                )[0];
                if (filteredValue) return [...previous, current];
                return [...previous];
            }, []),
        };
    }, {});
};

const getJobsFormObjects = (objects) => {
    const uniqueJobs = [
        ...new Set(
            objects.reduce(
                (prev, acc) => [
                    ...prev,
                    ...acc.type_relation.jobs.reduce(
                        (pre, curr) => [...pre, curr],
                        []
                    ),
                ],
                []
            )
        ),
    ];
    return uniqueJobs.reduce((prev, acc) => {
        return {
            ...prev,
            [acc.id]: {
                ...acc,
                value: objects.reduce((previous, current) => {
                    if (current.objects_jobs.length > 0) {
                        const filteredValue = current.objects_jobs.filter(
                            (job) => job.odb_job.id === acc.id
                        )[0];
                        if (filteredValue && filteredValue.value_percentage) {
                            return filteredValue.value_percentage;
                        }
                    }
                    return previous;
                }, 0),
                objects: objects.reduce((previous, current) => {
                    const filteredValue = !!current.type_relation.jobs.filter(
                        (job) => job.id === acc.id
                    )[0];
                    if (filteredValue) return [...previous, current];
                    return [...previous];
                }, []),
            },
        };
    }, {});
};

export const changeJobValue = (key, value) => (dispatch) => {
    dispatch(setJobDoneValue(key, value));
    dispatch(saveData(key, value));
};

export const setSelectedRoom = (selected_room) => (dispatch, getState) => {
    if (!getState().RoomsReducer.isChanged) {
        if (selected_room) {
            dispatch(selectedRoom(selected_room));
            dispatch(fetchObjectsByRoom());
        }
    } else {
        dispatch(initialiseModal("Uwaga", "Nie zapisano zmian!"));
    }
};

const createObjectJob = async (r, j, vp, va, t, us, obj) => {
    const { data, errors } = await graphQLClient.mutate({
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
            r,
            j,
            vp,
            va,
            t,
            us,
            obj,
        },
    });
    return { data, errors };
};

const updateObjectJob = async (id) => {
    const { data, errors } = await graphQLClient.mutate({
        mutation: gql`
            mutation updateObjectJob($i: ID!) {
                updateOdbObjectsJob(
                    input: { where: { id: $i }, data: { isActual: false } }
                ) {
                    odbObjectsJob {
                        id
                        isActual
                    }
                }
            }
        `,
        variables: {
            i: id,
        },
    });
    return { data, errors };
};

const getJSON = (object, jobs) => {
    return object.type_relation.jobs.map((job) => ({
        job: job.id,
        value: jobs[job.id].value || 0,
    }));
};

export const saveData = (current_job, value) => async (dispatch, getState) => {
    if (!value) return;
    if (!current_job) return;
    dispatch(objectsJobsSavingStart());
    const { jobs, selected_room } = getState().RoomsReducer;
    const { user } = getState().AutodeskLogin;
    const sentObjects = await jobs[current_job].objects.map(async (object) => {
        // r, j, vp, va, t, us, obj
        return await createObjectJob(
            selected_room,
            current_job,
            value,
            object.area * value,
            object.type_relation.id,
            user.userName || "",
            object.id
        );
    });
    console.log(sentObjects);
    dispatch(objectsJobsSavingEnd());
};
