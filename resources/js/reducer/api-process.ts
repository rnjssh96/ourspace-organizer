import {
    SET_SPACE_FETCHING, APIProcessActions, APIProcessState,
} from '../redux-types/api-process';

/**
 * Initial State
 */
const initialState: APIProcessState = {
    currentSpace: {
        spaceFetching: false,
    }
};

/**
 * APIProcessReducer
 */
export default function APIProcessReducer(
    state = initialState,
    action: APIProcessActions,
): APIProcessState {
    switch (action.type) {
        case SET_SPACE_FETCHING:
            return {
                ...state,
                currentSpace: {
                    ...state.currentSpace,
                    spaceFetching: action.spaceFetching,
                },
            };

        default:
            return state;
    }
}
