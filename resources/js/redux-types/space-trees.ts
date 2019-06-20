import { Action } from 'redux';

import SpaceTrees from '../model/space-tree';
import { RequestStatus } from '../model/system';

/**
 * State
 */
export interface State {
    data?: SpaceTrees;
    requestingStatus: RequestStatus;
}

/**
 * Action Constants
 */
// prettier-ignore
export const START_REQUEST = 'space-trees/START_REQUEST';
// prettier-ignore
export const RECEIVE_REQUEST = 'space-trees/RECEIVE_REQUEST';
// prettier-ignore
export const FAIL_REQUEST = 'space-trees/FAIL_REQUEST';
// prettier-ignore
export const RESET_DATA = 'space-trees/RESET_DATA';

/**
 * Action Interfacess
 */
export interface StartRequestAction extends Action<typeof START_REQUEST> {}

export interface ReceiveRequestAction extends Action<typeof RECEIVE_REQUEST> {
    data: SpaceTrees;
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
