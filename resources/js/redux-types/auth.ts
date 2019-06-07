import { Action } from 'redux';

/**
 * Auth State
 */
export type LoggedStatus = 'ready' | 'processing' | 'success' | 'failed';

export type AuthState = {
    loggedStatus: LoggedStatus;
};

/**
 * Action Constants
 */
// prettier-ignore
export const CHANGE_LOGGED_STATUS = 'current-space/CHANGE_LOGGED_STATUS';

/**
 * Action Interfaces
 */
export interface ChangeLoggedStatusAction
    extends Action<typeof CHANGE_LOGGED_STATUS> {
    loggedStatus: LoggedStatus;
}

/**
 * Action Types
 */
export type AuthActions = ChangeLoggedStatusAction;
