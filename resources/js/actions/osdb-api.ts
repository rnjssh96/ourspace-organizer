import { ActionCreator, Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import Space from '../model/space';
import SpaceTrees from '../model/space-tree';

import { osdbAttemptLogIn } from '../osdb-api/auth';
import { osdbGetSpace, osdbGetSpaceTrees } from '../osdb-api/space';

import { ChangeLoggedStatusAction, LoggedStatus } from '../redux-types/auth';
import { ReceiveSpaceTreesAction } from '../redux-types/space-trees';
import { ReceiveSpaceAction } from '../redux-types/current-space';

import { changeLoggedStatus } from './auth';
import { requestSpaceTrees, receiveSpaceTrees } from './space-trees';
import { requestSpace, receiveSpace } from './current-space';

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

/**
 * Fetch space trees from OSDB
 */
export const fetchSpaceTrees: ActionCreator<
    ThunkAction<void, SpaceTrees, null, ReceiveSpaceTreesAction>
> = () => async (dispatch: ThunkDispatch<SpaceTrees, null, Action<any>>) => {
    dispatch(requestSpaceTrees());
    osdbGetSpaceTrees('organizerUID').then((spaceTrees: SpaceTrees) => {
        dispatch(receiveSpaceTrees(spaceTrees));
    });
};

/**
 * Fetch space from OSDB
 */
export const fetchSpace: ActionCreator<
    ThunkAction<void, Space, null, ReceiveSpaceAction>
> = () => async (dispatch: ThunkDispatch<Space, null, Action<any>>) => {
    dispatch(requestSpace());
    osdbGetSpace('RgnQ71NWGxlikEOjbIdr').then((space: Space) => {
        dispatch(receiveSpace(space));
    });
};
