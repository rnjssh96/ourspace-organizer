import * as redux_types from '../redux-types/space-list';

/**
 * Initial State
 */
const initialState: redux_types.State = {
    dataStatus: { status: 'ready' },
};

/**
 * Reducer
 */
export default function Reducer(
    state = initialState,
    action: redux_types.Actions,
): redux_types.State {
    switch (action.type) {
        case redux_types.START_REQUEST:
            return {
                ...state,
                dataStatus: { status: 'processing' },
            };

        case redux_types.FINISH_REQUEST:
            return {
                ...state,
                data: action.data,
                dataStatus: { status: 'ready' },
            };

        case redux_types.FAIL_REQUEST:
            return {
                ...state,
                dataStatus: {
                    status: 'failed',
                    message: action.message,
                },
            };

        case redux_types.RESET_DATA:
            return initialState;

        default:
            return state;
    }
}
