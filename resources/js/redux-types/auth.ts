import { Action } from 'redux';

import Organizer from '../model/organizer';
import { LoginStatus, SignupStatus } from '../model/system';

/**
 * State
 */
export interface State {
    currentUser?: Organizer;
    loginStatus: LoginStatus;
    signupStatus: SignupStatus;
}

/**
 * Action Constants
 */
// prettier-ignore
export const REQUEST_LOGIN = 'auth/REQUEST_LOGIN';
// prettier-ignore
export const SUCCEED_LOGIN = 'auth/SUCCEED_LOGIN';
// prettier-ignore
export const FAIL_LOGIN = 'auth/FAIL_LOGIN';
// prettier-ignore
export const LOGOUT = 'auth/LOGOUT';

// prettier-ignore
export const REQUEST_SIGNUP = 'auth/SIGNUP_ON_PROCESS';
// prettier-ignore
export const SUCCEED_SIGNUP = 'auth/SUCCEED_SIGNUP';
// prettier-ignore
export const FAIL_SIGNUP = 'auth/FAIL_SIGNUP';

/**
 * Action Interfaces
 */
export interface RequestLoginAction extends Action<typeof REQUEST_LOGIN> {}

export interface SucceedLoginAction extends Action<typeof SUCCEED_LOGIN> {
    currentUser: Organizer;
}

export interface FailLoginAction extends Action<typeof FAIL_LOGIN> {
    message: string;
}

export interface LogoutAction extends Action<typeof LOGOUT> {}

export interface RequestSignupAction extends Action<typeof REQUEST_SIGNUP> {}

export interface SucceedSignupAction extends Action<typeof SUCCEED_SIGNUP> {}

export interface FailSignupAction extends Action<typeof FAIL_SIGNUP> {
    message: string;
}

/**
 * Action Types
 */
export type Actions =
    | RequestLoginAction
    | SucceedLoginAction
    | FailLoginAction
    | LogoutAction
    | RequestSignupAction
    | SucceedSignupAction
    | FailSignupAction;
