import * as redux_types from '../redux-types/space-history';

/**
 * Initial State
 */
const initialState: redux_types.State = {
    data: {
        stack: [],
        headers: {},
    },
};

/**
 * Reducer
 */
export default function Reducer(
    state = initialState,
    action: redux_types.Actions,
): redux_types.State {
    switch (action.type) {
        case redux_types.RESET_SPACE_HISTORY:
            return {
                data: {
                    stack: [],
                    headers: {},
                },
            };

        case redux_types.PUSH_INTO_SPACE_HISTORY:
            if (!state.data.headers[action.spaceHeader.id]) {
                state.data.stack.push(action.spaceHeader.id);
                return {
                    data: {
                        stack: state.data.stack,
                        headers: {
                            ...state.data.headers,
                            [action.spaceHeader.id]: action.spaceHeader,
                        },
                    },
                };
            } else {
                return state;
            }

        default:
            return state;
    }
}
