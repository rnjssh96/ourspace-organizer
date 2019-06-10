import { Action } from 'redux';

import OSOrganizer from '../model/organizer';

/**
 * Auth State
 */
export type LoggedStatus = 'ready' | 'processing' | 'success' | 'failed';

export type SignupStatus = 'ready' | 'processing' | 'success' | 'failed';

export interface AuthState {
    loggedStatus: LoggedStatus;
    signupStatus: SignupStatus;
    currentUser?: OSOrganizer;
    errorMessage?: string;
}

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

// prettier-ignore
export const SIGNUP_ON_PROCESS = 'current-space/SIGNUP_ON_PROCESS';
// prettier-ignore
export const SIGNUP_SUCCESS = 'current-space/SIGNUP_SUCCESS';
// prettier-ignore
export const SIGNUP_FAIL = 'current-space/SIGNUP_FAIL';

/**
 * Action Interfaces
 */
export interface OnProcessAction extends Action<typeof ON_PROCESS> {
    loggedStatus: 'processing';
}

export interface LoginSuccessAction extends Action<typeof LOGIN_SUCCESS> {
    loggedStatus: 'success';
    currentUser: OSOrganizer;
}

export interface LoginFailAction extends Action<typeof LOGIN_FAIL> {
    loggedStatus: 'failed';
    errorMessage: string;
}

export interface LogoutAction extends Action<typeof LOGOUT> {
    loggedStatus: 'ready';
}

export interface SignupOnProcessAction
    extends Action<typeof SIGNUP_ON_PROCESS> {
    signupStatus: 'processing';
}

export interface SignupSuccessAction extends Action<typeof SIGNUP_SUCCESS> {
    signupStatus: 'success';
}

export interface SignupFailAction extends Action<typeof SIGNUP_FAIL> {
    signupStatus: 'failed';
}

/**
 * Action Types
 */
export type AuthActions =
    | OnProcessAction
    | LoginSuccessAction
    | LoginFailAction
    | LogoutAction
    | SignupOnProcessAction
    | SignupSuccessAction
    | SignupFailAction;
