import { ActionCreator, Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import OSDBAxios from '../config/osdb-axios';
import OSFirebase from '../config/firebase';

import { RawOrganizer, rawOrganizer2Organizer } from '../model/organizer';

import * as authActions from '../actions/auth';
import { resetData as resetSpaceList } from '../actions/space-list';
import { resetSpaceHistory } from '../actions/space-history';
import { resetData as resetSpace } from '../actions/current-space';

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
                // const { data } = await OSDBAxios.get<RawOrganizer>(
                //     `organizers/${currentUser.uid}`,
                // );

                // const organizer = rawOrganizer2Organizer(data);
                // dispatch(authActions.succeedLogin(organizer));
                dispatch(
                    authActions.succeedLogin({
                        uid: 'TESTUID',
                        email: 'testuser@debug.test',
                        name: 'debugmodeusesr',
                        owningSpaces: [],
                        authority: 'admin',
                    }),
                );
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
        switch (error.code) {
            case 'auth/user-not-found':
                dispatch(authActions.failLogin('사용자가 존재하지 않습니다.'));
                break;
            case 'auth/wrong-password':
                dispatch(
                    authActions.failLogin('비밀번호가 일치하지 않습니다.'),
                );
                break;
            default:
                dispatch(authActions.failLogin(error.message));
        }
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
            dispatch(resetSpaceList());
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
        dispatch(authActions.failSignup(error.message));
    }
};
