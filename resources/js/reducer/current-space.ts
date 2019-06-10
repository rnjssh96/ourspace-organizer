import {
    CurrentSpaceActions,
    CurrentSpaceState,
    START_UPDATE_OH,
    FINISH_UPDATE_OH,
    SET_BUSY_LEVEL,
    UPDATE_SPACE_INTRODUCE,
    REQUEST_SPACE,
    RECEIVE_SPACE,
    END_REQUEST_SPACE,
    END_UPDATE_OH,
    RESET_SPACE,
    START_UPDATE_AT,
    FINISH_UPDATE_AT,
    END_UPDATE_AT,
} from '../redux-types/current-space';

/**
 * Initial State
 */
const initialState: CurrentSpaceState = {
    status: {
        requestingSpace: false,
        updatingOperatingHour: false,
        updatingAmentiyTags: false,
    },
};

/**
 * CurrentSpaceReducer
 */
export default function CurrentSpaceReducer(
    state = initialState,
    action: CurrentSpaceActions,
): CurrentSpaceState {
    switch (action.type) {
        case REQUEST_SPACE:
            return {
                ...state,
                status: {
                    ...state.status,
                    requestingSpace: true,
                },
            };

        case RECEIVE_SPACE:
            return {
                data: action.space,
                status: {
                    ...state.status,
                    requestingSpace: false,
                },
            };

        case END_REQUEST_SPACE:
            return {
                status: {
                    ...state.status,
                    requestingSpace: false,
                },
            };

        case RESET_SPACE:
            return {
                status: {
                    requestingSpace: false,
                    updatingOperatingHour: false,
                    updatingAmentiyTags: false,
                },
            };

        case UPDATE_SPACE_INTRODUCE:
            if (state.data)
                return {
                    ...state,
                    data: {
                        ...state.data,
                        spaceIntroduce: action.spaceIntroduce,
                    },
                };
            else return state;

        case START_UPDATE_OH:
            return {
                ...state,
                status: {
                    ...state.status,
                    updatingOperatingHour: true,
                },
            };

        case FINISH_UPDATE_OH:
            if (state.data)
                return {
                    ...state,
                    data: {
                        ...state.data,
                        operatingHours: action.operatingHours,
                    },
                    status: {
                        ...state.status,
                        updatingOperatingHour: false,
                    },
                };
            else return state;

        case END_UPDATE_OH:
            return {
                ...state,
                status: {
                    ...state.status,
                    updatingOperatingHour: false,
                },
            };

        case SET_BUSY_LEVEL:
            if (state.data)
                return {
                    ...state,
                    data: {
                        ...state.data,
                        busyLevel: action.busyLevel,
                    },
                };
            else return state;

        case START_UPDATE_AT:
            return {
                ...state,
                status: {
                    ...state.status,
                    updatingAmentiyTags: true,
                },
            };

        case FINISH_UPDATE_AT:
            if (state.data)
                return {
                    ...state,
                    data: {
                        ...state.data,
                        amenityTags: action.amenityTags,
                    },
                    status: {
                        ...state.status,
                        updatingAmentiyTags: false,
                    },
                };
            else return state;

        case END_UPDATE_AT:
            return {
                ...state,
                status: {
                    ...state.status,
                    updatingAmentiyTags: false,
                },
            };

        default:
            return state;
    }
}
