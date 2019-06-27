import { Action } from 'redux';

import { RequestStatus } from '../model/system';
import { SpaceHeader } from '../model/space-list';

/**
 * State
 */
export interface State {
    data?: SpaceHeader[];
    requestingStatus: RequestStatus;
}

/**
 * Action Constants
 */
// prettier-ignore
export const START_REQUEST = 'space-list/START_REQUEST';
// prettier-ignore
export const RECEIVE_REQUEST = 'space-list/RECEIVE_REQUEST';
// prettier-ignore
export const FAIL_REQUEST = 'space-list/FAIL_REQUEST';
// prettier-ignore
export const RESET_DATA = 'space-list/RESET_DATA';

/**
 * Action Interfacess
 */
export interface StartRequestAction extends Action<typeof START_REQUEST> {}

export interface ReceiveRequestAction extends Action<typeof RECEIVE_REQUEST> {
    data: SpaceHeader[];
}

export interface FailRequestAction extends Action<typeof FAIL_REQUEST> {
    message: string;
}

export interface ResetDataAction extends Action<typeof RESET_DATA> {}

/**
 * Action Types
 */
export type Actions =
    | StartRequestAction
    | ReceiveRequestAction
    | FailRequestAction
    | ResetDataAction;
