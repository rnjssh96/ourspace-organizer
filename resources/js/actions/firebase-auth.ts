import { ActionCreator, Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { ChangeLoggedStatusAction, LoggedStatus } from '../redux-types/auth';
import { changeLoggedStatus } from './auth';

import OSFirebase from '../config/firebase';

/**
 * Attempt log in
 */
export const attemptLogIn: ActionCreator<
    ThunkAction<void, LoggedStatus, null, ChangeLoggedStatusAction>
> = (userEmail: string, userPassword: string) => async (
    dispatch: ThunkDispatch<LoggedStatus, null, Action<any>>,
) => {
    dispatch(changeLoggedStatus('processing'));
    OSFirebase.auth()
        .signInWithEmailAndPassword(userEmail, userPassword)
        .then(() => {
            dispatch(changeLoggedStatus('success'));
        })
        .catch(err => {
            dispatch(changeLoggedStatus('failed'));
        });
};

/**
 * Log out
 */
export const logOut: ActionCreator<
    ThunkAction<void, LoggedStatus, null, ChangeLoggedStatusAction>
> = () => async (dispatch: ThunkDispatch<LoggedStatus, null, Action<any>>) => {
    OSFirebase.auth()
        .signOut()
        .then(() => {
            dispatch(changeLoggedStatus('ready'));
        });
};
