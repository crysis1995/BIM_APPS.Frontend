import { graphQLClient } from "../../../../services";
import { gql } from "apollo-boost";
import { jobsPrepare } from "../jobs/actions";

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

const fetchObjectsEnd = (objects) => ({
    type: OBJECTS_LOADING_END,
    objects,
});

const cleanArrayByEmptyJobs = (objects) => {
    return objects.reduce((prev, acc) => {
        if (acc.type_relation.jobs.length === 0) return prev;
        return [...prev, acc];
    }, []);
};

const changeObjectsArrayToObject = (objects) => {
    return objects.reduce((prev, acc) => {
        return {
            ...prev,
            [acc.id]: acc,
        };
    }, {});
};

export const fetchObjectsByRoom = (selected_room) => async (dispatch) => {
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
            variables: { r: selected_room },
            fetchPolicy: "no-cache",
        });
        if (data) {
            const objects = changeObjectsArrayToObject(
                cleanArrayByEmptyJobs(data.odbObjects)
            );
            dispatch(jobsPrepare(objects));
            dispatch(fetchObjectsEnd(objects));
        }
        if (errors) {
            dispatch(fetchObjectsError(errors));
        }
    } catch (e) {
        console.error(e);
    }
};
