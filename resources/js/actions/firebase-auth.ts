import { ActionCreator, Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { ChangeLoggedStatusAction, LoggedStatus } from '../redux-types/auth';
import { osdbAttemptLogIn } from '../osdb-api/auth';
import { changeLoggedStatus } from './auth';

/**
 * Attempt log in
 */
export const attemptLogIn: ActionCreator<
    ThunkAction<void, LoggedStatus, null, ChangeLoggedStatusAction>
> = (userEmail: string, userPassword: string) => async (
    dispatch: ThunkDispatch<LoggedStatus, null, Action<any>>,
) => {
    dispatch(changeLoggedStatus('processing'));
    osdbAttemptLogIn(userEmail, userPassword).then((result: LoggedStatus) => {
        dispatch(changeLoggedStatus(result));
    });
};

/**
 * Log out
 */
export const logOut: ActionCreator<
    ThunkAction<void, LoggedStatus, null, ChangeLoggedStatusAction>
> = () => async (dispatch: ThunkDispatch<LoggedStatus, null, Action<any>>) => {
    dispatch(changeLoggedStatus('ready'));
};