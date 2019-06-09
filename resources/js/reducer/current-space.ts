import {
    CurrentSpaceActions,
    CurrentSpaceState,
    START_UPDATE_OH,
    FINISH_UPDATE_OH,
    SET_BUSY_LEVEL,
    SET_AMENITY_TAGS,
    UPDATE_SPACE_INTRODUCE,
    REQUEST_SPACE,
    RECEIVE_SPACE,
    END_REQUEST_SPACE,
    END_UPDATE_OH,
} from '../redux-types/current-space';

/**
 * Initial State
 */
const initialState: CurrentSpaceState = {
    status: {
        requestingSpace: false,
        updatingOperatingHour: false,
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

        case UPDATE_SPACE_INTRODUCE:
            if (state.data)
                return {
                    ...state,
                    data: {
                        ...state.data,
                        spaceIntroduce: action.spaceIntroduce,
                    },
                };
            else
                return state;

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
            else
                return state;

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
            else
                return state;

        case SET_AMENITY_TAGS:
            if (state.data)
                return {
                    ...state,
                    data: {
                        ...state.data,
                        amenityTags: action.amenityTags,
                    },
                };
            else
                return state;

        default:
            return state;
    }
}
