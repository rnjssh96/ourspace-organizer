import { ActionCreator, Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import OSFirebase from '../config/firebase';

import {
    LoginSuccessAction,
    LoggedStatus,
    LogoutAction,
} from '../redux-types/auth';
import { onProcess, loginSuccess, loginFail, logout } from './auth';

/**
 * Attempt log in
 */
export const attemptLogIn: ActionCreator<
    ThunkAction<void, LoggedStatus, null, LoginSuccessAction>
> = (userEmail: string, userPassword: string) => async (
    dispatch: ThunkDispatch<LoggedStatus, null, Action<any>>,
) => {
    dispatch(onProcess());
    OSFirebase.auth()
        .signInWithEmailAndPassword(userEmail, userPassword)
        .then(() => {
            let currentUser = OSFirebase.auth().currentUser;
            if (currentUser !== null) {
                dispatch(loginSuccess(currentUser));
            } else {
                dispatch(loginFail());
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(loginFail());
        });
};

/**
 * Log out
 */
export const logOut: ActionCreator<
    ThunkAction<void, LoggedStatus, null, LogoutAction>
> = () => async (dispatch: ThunkDispatch<LoggedStatus, null, Action<any>>) => {
    OSFirebase.auth()
        .signOut()
        .then(() => {
            dispatch(logout());
        });
};
