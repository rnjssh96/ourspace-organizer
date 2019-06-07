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
    data: {
        id: '',
        spaceNames: {},
        types: [],
        locationText: '',
        location: { lat: 0, lng: 0 },
        operatingHours: [],
        amenityTags: [],
        spaceIntroduce: '',
        images: [],
        rank: 0,
        busyLevel: '1',
    },
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
            return {
                ...state,
                data: {
                    ...state.data,
                    spaceIntroduce: action.spaceIntroduce,
                },
            };

        case SET_OPERATING_HOURS:
            return {
                ...state,
                data: {
                    ...state.data,
                    operatingHours: action.operatingHours,
                },
            };

        case SET_BUSY_LEVEL:
            return {
                ...state,
                data: {
                    ...state.data,
                    busyLevel: action.busyLevel,
                },
            };

        case SET_AMENITY_TAGS:
            return {
                ...state,
                data: {
                    ...state.data,
                    amenityTags: action.amenityTags,
                },
            };

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
