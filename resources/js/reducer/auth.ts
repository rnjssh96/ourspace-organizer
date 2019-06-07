import {
    AuthActions,
    AuthState,
    CHANGE_LOGGED_STATUS,
} from '../redux-types/auth';

/**
 * Initial State
 */
const initialState: AuthState = {
    loggedStatus: 'ready',
};

/**
 * AuthReducer
 */
export default function AuthReducer(
    state = initialState,
    action: AuthActions,
): AuthState {
    switch (action.type) {
        case CHANGE_LOGGED_STATUS:
            return {
                ...state,
                loggedStatus: action.loggedStatus,
            };

        default:
            return state;
    }
}
