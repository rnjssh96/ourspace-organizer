import { Action } from 'redux';

import OSFirebase from '../config/firebase';

/**
 * Auth State
 */
export type LoggedStatus = 'ready' | 'processing' | 'success' | 'failed';

export type OSUser = OSFirebase.User;

export type AuthState = {
    loggedStatus: LoggedStatus;
    currentUser?: OSUser;
    responseMessage?: string;
};

/**
 * Action Constants
 */
// prettier-ignore
export const ON_PROCESS = 'current-space/ON_PROCESS';
// prettier-ignore
export const LOGIN_SUCCESS = 'current-space/LOGIN_SUCCESS';
// prettier-ignore
export const LOGIN_FAIL = 'current-space/LOGIN_FAIL';
// prettier-ignore
export const LOGOUT = 'current-space/LOGOUT';

/**
 * Action Interfaces
 */
export interface OnProcessAction extends Action<typeof ON_PROCESS> {
    loggedStatus: 'processing';
}

export interface LoginSuccessAction extends Action<typeof LOGIN_SUCCESS> {
    loggedStatus: 'success';
    currentUser: OSUser;
}

export interface LoginFailAction extends Action<typeof LOGIN_FAIL> {
    loggedStatus: 'failed';
}

export interface LogoutAction extends Action<typeof LOGOUT> {
    loggedStatus: 'ready';
}

/**
 * Action Types
 */
export type AuthActions =
    | OnProcessAction
    | LoginSuccessAction
    | LoginFailAction
    | LogoutAction;
