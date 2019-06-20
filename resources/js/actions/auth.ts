import { ActionCreator } from 'redux';

import * as redux_types from '../redux-types/auth';

import Organizer from '../model/organizer';

/**
 * Action Creators
 */
export const requestLogin: ActionCreator<
    redux_types.RequestLoginAction
> = () => ({
    type: redux_types.REQUEST_LOGIN,
});

export const succeedLogin: ActionCreator<redux_types.SucceedLoginAction> = (
    currentUser: Organizer,
) => ({
    type: redux_types.SUCCEED_LOGIN,
    currentUser,
});

export const failLogin: ActionCreator<redux_types.FailLoginAction> = (
    message: string,
) => ({
    type: redux_types.FAIL_LOGIN,
    message,
});

export const logout: ActionCreator<redux_types.LogoutAction> = () => ({
    type: redux_types.LOGOUT,
});

export const requestSignup: ActionCreator<
    redux_types.RequestSignupAction
> = () => ({
    type: redux_types.REQUEST_SIGNUP,
});

export const succeedSignup: ActionCreator<
    redux_types.SucceedSignupAction
> = () => ({
    type: redux_types.SUCCEED_SIGNUP,
});

export const failSignup: ActionCreator<redux_types.FailSignupAction> = (
    message: string,
) => ({
    type: redux_types.FAIL_SIGNUP,
    message,
});
