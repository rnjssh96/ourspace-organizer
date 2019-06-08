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
    SignupOnProcessAction,
    SignupSuccessAction,
    SignupFailAction,
    SIGNUP_ON_PROCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
} from '../redux-types/auth';
import OSUser from '../model/user';

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

export const signupOnProcess: ActionCreator<SignupOnProcessAction> = (
) => ({
    type: SIGNUP_ON_PROCESS,
    signupStatus: 'processing',
});

export const signupSuccess: ActionCreator<SignupSuccessAction> = (
) => ({
    type: SIGNUP_SUCCESS,
    signupStatus: 'success',
});

export const signupFail: ActionCreator<SignupFailAction> = (
) => ({
    type: SIGNUP_FAIL,
    signupStatus: 'failed',
});
