import { graphQLClient } from "../../../services";
import { gql } from "apollo-boost";
import { initialiseModal } from "../../Modal/redux/actions";

//          TYPES
export const ODBIORY_COMPONENT_STARTED = "ODBIORY_COMPONENT_STARTED";
export const ODBIORY_FETCH_ROOMS = "ODBIORY_FETCH_ROOMS";
export const ODBIORY_SET_SELECTED_ROOM = "ODBIORY_SET_SELECTED_ROOM";
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

const fetchRooms = (rooms) => ({
    type: ODBIORY_FETCH_ROOMS,
    rooms,
});

const fetchError = (errors) => ({
    type: ODBIORY_FETCH_ERROR,
    errors,
});

const selectedRoom = (selected_room) => ({
    type: ODBIORY_SET_SELECTED_ROOM,
    selected_room,
});

const setJobsAndObjects = (jobs, objects) => ({
    type: ODBIORY_SET_JOBS_AND_OBJECTS,
    jobs,
    objects,
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
            dispatch(fetchError(errors));
            break;
        }
    }

    dispatch(fetchRooms(rooms));
};

const fetchObjectsByRoom = () => async (dispatch, getState) => {
    const query = gql`
        query getFilteredObjects($r: ID!) {
            odbObjects(where: { room: $r }) {
                id
                area
                object_type {
                    type
                }
                job {
                    job {
                        id
                    }
                    value
                }
                type_relation {
                    name
                    jobs {
                        name
                        id
                    }
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
            console.log(data.odbObjects);
            const jobs = getJobsFormObjects(data.odbObjects);
            console.log(jobs);
            const objects = data.odbObjects;
            // const objects = groupObjectByType(data.odbObjects);
            dispatch(setJobsAndObjects(jobs, objects));
        }
        if (errors) {
            dispatch(fetchError(errors));
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
                    if (current.job.length > 0) {
                        const filteredValue = current.job.filter(
                            (job) => job.job.id === acc.id
                        )[0];
                        if (filteredValue && filteredValue.value) {
                            return filteredValue.value;
                        }
                    }
                    return previous;
                }, 0),
            },
        };
    }, {});
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

const updateObject = async (i, jb) => {
    const { data, errors } = await graphQLClient.mutate({
        mutation: gql`
            mutation updateObject(
                $i: ID!
                $jb: [editComponentRoboryOdbioryInput]
            ) {
                updateOdbObject(
                    input: { where: { id: $i }, data: { job: $jb } }
                ) {
                    odbObject {
                        id
                        job {
                            job {
                                id
                                name
                            }
                            value
                        }
                    }
                }
            }
        `,
        variables: {
            i,
            jb,
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

export const saveData = () => (dispatch, getState) => {
    const { jobs, objects } = getState().RoomsReducer;
    const resp = objects.map((object) =>
        updateObject(object.id, getJSON(object, jobs))
    );
    Promise.all(resp).then((re) => {
        const data = re.filter((e) => !!e.data);
        const errors = re.filter((e) => e.errors);
        if (data.length === resp.length) {
            console.log(data);
            dispatch(initialiseModal("Sukces!", "Zapisano pomyślnie"));
        } else {
            dispatch(
                initialiseModal(
                    "Uwaga!",
                    "Coś poszło nie tak. Spróbuj ponownie."
                )
            );
            console.log(errors);
        }
        dispatch(savedProperly());
    });
};

export const cleanChanges = () => (dispatch, getState) => {
    const jobs = getJobsFormObjects(getState().RoomsReducer.objects);
    dispatch(cleanChangedJobs(jobs));
};
