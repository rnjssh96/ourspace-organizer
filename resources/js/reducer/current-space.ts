import {
    CurrentSpaceActions,
    CurrentSpaceState,
    SET_OPERATING_HOURS,
    SET_BUSY_LEVEL,
    SET_AMENITY_TAGS,
    UPDATE_SPACE_INTRODUCE,
    REQUEST_SPACE,
    RECEIVE_SPACE,
} from '../redux-types/current-space';

/**
 * Initial State
 */
const initialState: CurrentSpaceState = {
    status: {
        requestingSpace: false,
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

        case SET_OPERATING_HOURS:
            if (state.data)
                return {
                    ...state,
                    data: {
                        ...state.data,
                        operatingHours: action.operatingHours,
                    },
                };
            else
                return state;

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

        default:
            return state;
    }
}
