import { ActionCreator } from 'redux';

import {
    ON_PROCESS,
    LOGIN_SUCCESS,
    OnProcessAction,
    LoginSuccessAction,
    LoginFailAction,
    LOGIN_FAIL,
    LogoutAction,
    LOGOUT,
    OSUser,
} from '../redux-types/auth';

/**
 * Action Creators
 */
export const onProcess: ActionCreator<OnProcessAction> = (
) => ({
    type: ON_PROCESS,
    loggedStatus: 'processing',
});

export const loginSuccess: ActionCreator<LoginSuccessAction> = (
    currentUser: OSUser,
) => ({
    type: LOGIN_SUCCESS,
    loggedStatus: 'success',
    currentUser,
});

export const loginFail: ActionCreator<LoginFailAction> = (
) => ({
    type: LOGIN_FAIL,
    loggedStatus: 'failed',
});

export const logout: ActionCreator<LogoutAction> = (
) => ({
    type: LOGOUT,
    loggedStatus: 'ready',
});
