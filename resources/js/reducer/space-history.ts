import {
    SpaceHistoryActions,
    SpaceHistoryState,
    RESET_SPACE_HISTORY,
    PUSH_INTO_SPACE_HISTORY,
} from '../redux-types/space-history';

/**
 * Initial State
 */
const initialState: SpaceHistoryState = {
    data: {
        stack: [],
        headers: {},
    },
};

/**
 * SpaceHistoryReducer
 */
export default function SpaceHistoryReducer(
    state = initialState,
    action: SpaceHistoryActions,
): SpaceHistoryState {
    switch (action.type) {
        case RESET_SPACE_HISTORY:
            return {
                data: {
                    stack: [],
                    headers: {},
                },
            };

        case PUSH_INTO_SPACE_HISTORY:
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
