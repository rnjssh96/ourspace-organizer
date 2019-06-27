import * as redux_types from '../redux-types/current-space';

/**
 * Initial State
 */
const initialState: redux_types.State = {
    requestingStatus: { status: 'ready' },
    updatingGIStatus: { status: 'ready' },
    updatingSDStatus: { status: 'ready' },
    updatingATStatus: { status: 'ready' },
    updatingImagesStatus: { status: 'ready' },
};

/**
 * Reducer
 */
export default function Reducer(
    state = initialState,
    action: redux_types.Actions,
): redux_types.State {
    switch (action.type) {
        //
        //
        // Data
        //
        //
        case redux_types.START_REQUEST:
            return {
                ...state,
                requestingStatus: { status: 'requesting' },
            };

        case redux_types.RECEIVE_REQUEST:
            return {
                ...state,
                data: action.space,
                requestingStatus: { status: 'succeed' },
            };

        case redux_types.FAIL_REQUEST:
            return {
                ...state,
                requestingStatus: { status: 'failed', message: action.message },
            };

        case redux_types.RESET_DATA:
            return initialState;

        //
        //
        // General information
        //
        //
        case redux_types.START_UPDATE_GI:
            return {
                ...state,
                updatingGIStatus: { status: 'requesting' },
            };

        case redux_types.SUCCEED_UPDATE_GI:
            if (state.data)
                return {
                    ...state,
                    data: {
                        ...state.data,
                        ...action.generalInfo,
                    },
                    updatingGIStatus: { status: 'succeed' },
                };
            else return state;

        case redux_types.FAIL_UPDATE_GI:
            return {
                ...state,
                updatingGIStatus: { status: 'failed', message: action.message },
            };

        //
        //
        // Space description
        //
        //
        case redux_types.START_UPDATE_SD:
            return {
                ...state,
                updatingSDStatus: { status: 'requesting' },
            };

        case redux_types.SUCCEED_UPDATE_SD:
            if (state.data)
                return {
                    ...state,
                    data: {
                        ...state.data,
                        spaceDescription: action.spaceDescription,
                    },
                    updatingSDStatus: { status: 'succeed' },
                };
            else return state;

        case redux_types.FAIL_UPDATE_SD:
            return {
                ...state,
                updatingSDStatus: { status: 'failed', message: action.message },
            };

        //
        //
        // Amenity tags
        //
        //
        case redux_types.START_UPDATE_AT:
            return {
                ...state,
                updatingATStatus: { status: 'requesting' },
            };

        case redux_types.SUCCEED_UPDATE_AT:
            if (state.data)
                return {
                    ...state,
                    data: {
                        ...state.data,
                        amenityTags: action.amenityTags,
                    },
                    updatingATStatus: { status: 'succeed' },
                };
            else return state;

        case redux_types.FAIL_UPDATE_AT:
            return {
                ...state,
                updatingATStatus: { status: 'failed', message: action.message },
            };

        //
        //
        // Images
        //
        //
        case redux_types.START_UPDATE_IMAGES:
            return {
                ...state,
                updatingImagesStatus: { status: 'requesting' },
            };

        case redux_types.SUCCEED_UPDATE_IMAGES:
            if (state.data)
                return {
                    ...state,
                    data: {
                        ...state.data,
                        images: action.images,
                    },
                    updatingImagesStatus: { status: 'succeed' },
                };
            else return state;

        case redux_types.FAIL_UPDATE_IMAGES:
            return {
                ...state,
                updatingATStatus: { status: 'failed', message: action.message },
            };

        //
        //
        // Busy level
        //
        //
        case redux_types.SET_BUSY_LEVEL:
            if (state.data)
                return {
                    ...state,
                    data: {
                        ...state.data,
                        busyLevel: action.busyLevel,
                    },
                };
            else return state;

        default:
            return state;
    }
}
