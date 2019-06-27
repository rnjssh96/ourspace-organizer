import * as redux_types from '../redux-types/space-list';

/**
 * Initial State
 */
const initialState: redux_types.State = {
    requestingStatus: { status: 'ready' },
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
                requestingStatus: { status: 'requesting' },
            };

        case redux_types.RECEIVE_REQUEST:
            return {
                ...state,
                data: action.data,
                requestingStatus: { status: 'succeed' },
            };

        case redux_types.FAIL_REQUEST:
            return {
                ...state,
                requestingStatus: {
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
