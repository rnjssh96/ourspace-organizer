import { ActionCreator } from 'redux';

import {
    CHANGE_LOGGED_STATUS,
    ChangeLoggedStatusAction,
    LoggedStatus,
} from '../redux-types/auth';

/**
 * Action Creators
 */
export const changeLoggedStatus: ActionCreator<ChangeLoggedStatusAction> = (
    loggedStatus: LoggedStatus,
) => ({
    type: CHANGE_LOGGED_STATUS,
    loggedStatus,
});
