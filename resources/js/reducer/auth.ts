import {
    AuthActions,
    AuthState,
    LOGIN_SUCCESS,
    ON_PROCESS,
    LOGIN_FAIL,
    LOGOUT,
    SIGNUP_ON_PROCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
} from '../redux-types/auth';

/**
 * Initial State
 */
const initialState: AuthState = {
    loggedStatus: 'ready',
    signupStatus: 'ready',
};

/**
 * AuthReducer
 */
export default function AuthReducer(
    state = initialState,
    action: AuthActions,
): AuthState {
    switch (action.type) {
        case ON_PROCESS:
            return {
                ...state,
                loggedStatus: action.loggedStatus,
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                loggedStatus: action.loggedStatus,
                currentUser: action.currentUser,
            };

        case LOGIN_FAIL:
            return {
                ...state,
                loggedStatus: action.loggedStatus,
            };

        case LOGOUT:
            return {
                ...state,
                loggedStatus: action.loggedStatus,
                currentUser: undefined,
            };

        case SIGNUP_ON_PROCESS:
            return {
                ...state,
                signupStatus: action.signupStatus,
            };

        case SIGNUP_SUCCESS:
            return {
                ...state,
                signupStatus: action.signupStatus,
            };

        case SIGNUP_FAIL:
            return {
                ...state,
                signupStatus: action.signupStatus,
            };

        default:
            return state;
    }
}
