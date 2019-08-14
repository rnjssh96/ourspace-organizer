import * as redux_types from '../redux-types/space-search';

/**
 * Initial State
 */
const initialState: redux_types.State = {
    result: [],
};

/**
 * Reducer
 */
export default function Reducer(
    state = initialState,
    action: redux_types.Actions,
): redux_types.State {
    switch (action.type) {
        case redux_types.FINISH_SEARCH:
            return {
                ...state,
                result: action.result,
            };

        default:
            return state;
    }
}
