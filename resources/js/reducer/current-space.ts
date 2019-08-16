import * as redux_types from '../redux-types/current-space';

/**
 * Initial State
 */
const initialState: redux_types.State = {
    dataStatus: { status: 'ready' },
    imagesStatus: { status: 'ready' },
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
                dataStatus: {
                    status: 'processing',
                    requestUnit: action.requestUnit,
                },
            };

        case redux_types.FINISH_REQUEST:
            return {
                ...state,
                data: action.space,
                dataStatus: { status: 'ready' },
            };

        case redux_types.FAIL_REQUEST:
            return {
                ...state,
                dataStatus: { status: 'failed', message: action.message },
            };

        case redux_types.RESET_DATA:
            return initialState;

        //
        //
        // Images
        //
        //
        case redux_types.START_IMAGES_UPDATE:
            return {
                ...state,
                imagesStatus: { status: 'processing' },
            };

        case redux_types.FINISH_IMAGES_UPDATE:
            if (state.data)
                return {
                    ...state,
                    data: {
                        ...state.data,
                        images: action.images,
                    },
                    imagesStatus: { status: 'ready' },
                };
            else return state;

        case redux_types.FAIL_IMAGES_UPDATE:
            return {
                ...state,
                imagesStatus: {
                    status: 'failed',
                    message: action.message,
                },
            };

        //
        // Default
        //
        default:
            return state;
    }
}
