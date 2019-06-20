import * as redux_types from '../redux-types/auth';

/**
 * Initial State
 */
const initialState: redux_types.State = {
    loginStatus: { status: 'ready' },
    signupStatus: { status: 'ready' },
};

/**
 * Reducer
 */
export default function Reducer(
    state = initialState,
    action: redux_types.Actions,
): redux_types.State {
    switch (action.type) {
        case redux_types.REQUEST_LOGIN:
            return {
                ...state,
                loginStatus: { status: 'processing' },
            };

        case redux_types.SUCCEED_LOGIN:
            return {
                ...state,
                loginStatus: { status: 'succeed' },
                currentUser: action.currentUser,
            };

        case redux_types.FAIL_LOGIN:
            return {
                ...state,
                loginStatus: { status: 'failed', message: action.message },
            };

        case redux_types.LOGOUT:
            return initialState;

        case redux_types.REQUEST_SIGNUP:
            return {
                ...state,
                signupStatus: { status: 'processing' },
            };

        case redux_types.SUCCEED_SIGNUP:
            return {
                ...state,
                signupStatus: { status: 'succeed' },
            };

        case redux_types.FAIL_SIGNUP:
            return {
                ...state,
                signupStatus: { status: 'failed', message: action.message },
            };

        default:
            return state;
    }
}
