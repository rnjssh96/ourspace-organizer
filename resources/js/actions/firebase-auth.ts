import { ActionCreator, Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import OSFirebase from '../config/firebase';
import OSUser from '../model/user';

import { LoggedStatus, SignupStatus } from '../redux-types/auth';
import {
    onProcess,
    loginSuccess,
    loginFail,
    logout,
    signupSuccess,
    signupFail,
    signupOnProcess,
} from './auth';
import { osdbCreatUserInfo, osdbFetchUserInfo } from '../osdb-api/user';

/**
 * Attempt log in
 */
export const attemptLogIn: ActionCreator<
    ThunkAction<void, LoggedStatus, null, Action<any>>
> = (userEmail: string, userPassword: string) => async (
    dispatch: ThunkDispatch<LoggedStatus, null, Action<any>>,
) => {
    dispatch(onProcess());
    OSFirebase.auth()
        .signInWithEmailAndPassword(userEmail, userPassword)
        .then(() => {
            let currentUser = OSFirebase.auth().currentUser;
            if (currentUser !== null) {
                osdbFetchUserInfo(currentUser.uid).then((user: OSUser) => {
                    dispatch(loginSuccess(user));
                });
            } else {
                dispatch(loginFail());
            }
        })
        .catch((err: any) => {
            dispatch(loginFail());
        });
};

/**
 * Log out
 */
export const logOut: ActionCreator<
    ThunkAction<void, LoggedStatus, null, Action<any>>
> = () => async (dispatch: ThunkDispatch<LoggedStatus, null, Action<any>>) => {
    OSFirebase.auth()
        .signOut()
        .then(() => {
            dispatch(logout());
        });
};

/**
 * Signup
 */
export const signup: ActionCreator<
    ThunkAction<void, SignupStatus, null, Action<any>>
> = (userEmail: string, userName: string, userPassword: string) => async (
    dispatch: ThunkDispatch<SignupStatus, null, Action<any>>,
) => {
    dispatch(signupOnProcess());
    OSFirebase.auth()
        .createUserWithEmailAndPassword(userEmail, userPassword)
        .then((user: OSFirebase.auth.UserCredential) => {
            if (user.user && user.user.uid) {
                osdbCreatUserInfo(user.user.uid, userName, userEmail)
                    .then(() => {
                        dispatch(signupSuccess());
                    })
                    .catch(() => {
                        dispatch(signupFail());
                    });
            }
        })
        .catch((err: any) => {
            dispatch(signupFail());
        });
};
