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

import OSOrganizer from '../model/organizer';

/**
 * Action Creators
 */
export const onProcess: ActionCreator<OnProcessAction> = () => ({
    type: ON_PROCESS,
    loggedStatus: 'processing',
});

export const loginSuccess: ActionCreator<LoginSuccessAction> = (
    currentUser: OSOrganizer,
) => ({
    type: LOGIN_SUCCESS,
    loggedStatus: 'success',
    currentUser,
});

export const loginFail: ActionCreator<LoginFailAction> = errorMessage => ({
    type: LOGIN_FAIL,
    loggedStatus: 'failed',
    errorMessage,
});

export const logout: ActionCreator<LogoutAction> = () => ({
    type: LOGOUT,
    loggedStatus: 'ready',
});

export const signupOnProcess: ActionCreator<SignupOnProcessAction> = () => ({
    type: SIGNUP_ON_PROCESS,
    signupStatus: 'processing',
});

export const signupSuccess: ActionCreator<SignupSuccessAction> = () => ({
    type: SIGNUP_SUCCESS,
    signupStatus: 'success',
});

export const signupFail: ActionCreator<SignupFailAction> = () => ({
    type: SIGNUP_FAIL,
    signupStatus: 'failed',
});
