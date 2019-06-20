import { ActionCreator, Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import OSFirebase from '../config/firebase';
import OSDBAxios from '../config/osdb-axios';

import { RawOrganizer, rawOrganizer2Organizer } from '../model/organizer';

import * as authActions from '../actions/auth';
import { resetData as resetSpaceTrees } from '../actions/space-trees';
import { resetSpaceHistory } from '../actions/space-history';
import { resetData as resetSpace } from '../actions/space-trees';

/**
 *
 *
 * Request login
 *
 *
 */
export const requestLogin: ActionCreator<
    ThunkAction<void, any, null, Action<any>>
> = (userEmail: string, userPassword: string) => async (
    dispatch: ThunkDispatch<any, null, Action<any>>,
) => {
    dispatch(authActions.requestLogin());

    try {
        await OSFirebase.auth().signInWithEmailAndPassword(
            userEmail,
            userPassword,
        );
        let currentUser = await OSFirebase.auth().currentUser;
        if (currentUser !== null) {
            try {
                const { data } = await OSDBAxios.get<RawOrganizer>(
                    `organizers/${currentUser.uid}`,
                );

                const organizer = rawOrganizer2Organizer(data);
                dispatch(authActions.succeedLogin(organizer));
            } catch (error) {
                dispatch(
                    authActions.failLogin(
                        '사용자 정보를 가져오는데 실패했습니다.',
                    ),
                );
            }
        } else {
            dispatch(authActions.failLogin('로그인에 실패하였습니다.'));
        }
    } catch (error) {
        dispatch(authActions.failLogin(error));
    }
};

/**
 *
 *
 * Log out
 *
 *
 */
export const requestLogout: ActionCreator<
    ThunkAction<void, any, null, Action<any>>
> = () => async (dispatch: ThunkDispatch<any, null, Action<any>>) => {
    OSFirebase.auth()
        .signOut()
        .then(() => {
            dispatch(resetSpaceTrees());
            dispatch(resetSpaceHistory());
            dispatch(resetSpace());
            dispatch(authActions.logout());
        });
};

/**
 * Signup
 */
export const requestSignup: ActionCreator<
    ThunkAction<void, any, null, Action<any>>
> = (userEmail: string, userName: string, userPassword: string) => async (
    dispatch: ThunkDispatch<any, null, Action<any>>,
) => {
    dispatch(authActions.requestSignup());
    try {
        const UserCredential: OSFirebase.auth.UserCredential = await OSFirebase.auth().createUserWithEmailAndPassword(
            userEmail,
            userPassword,
        );
        if (UserCredential.user !== null && UserCredential.user.uid) {
            const { data } = await OSDBAxios.post<{ success: boolean }>(
                '/organizers',
                {
                    uid: UserCredential.user.uid,
                    name: userName,
                    authority: 'organizer',
                    email: userEmail,
                },
            );
            if (data.success) {
                dispatch(authActions.succeedSignup());
            } else {
                dispatch(authActions.failSignup('회원가입에 실패했습니다.'));
            }
        }
    } catch (error) {
        dispatch(authActions.failSignup(error));
    }
};
