import { Action } from 'redux';

import { DataStatus } from '../model/system';
import { SpaceHeader } from '../model/space-header';

/**
 * State
 */
export interface State {
    data?: SpaceHeader[];
    dataStatus: DataStatus;
}

/**
 * Action Constants
 */
// prettier-ignore
export const START_REQUEST = 'space-list/START_REQUEST';
// prettier-ignore
export const FINISH_REQUEST = 'space-list/FINISH_REQUEST';
// prettier-ignore
export const FAIL_REQUEST = 'space-list/FAIL_REQUEST';
// prettier-ignore
export const RESET_DATA = 'space-list/RESET_DATA';

/**
 * Action Interfacess
 */
export interface StartRequestAction extends Action<typeof START_REQUEST> {}

export interface FinishRequestAction extends Action<typeof FINISH_REQUEST> {
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
    | FinishRequestAction
    | FailRequestAction
    | ResetDataAction;
