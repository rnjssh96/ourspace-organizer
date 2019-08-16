import { Action } from 'redux';

import Space, { SpaceImage } from '../model/space';
import { RequestStatus } from '../model/system';

/**
 * State
 */
export interface State {
    data?: Space;
    requestingStatus: RequestStatus;
    updatingSDStatus: RequestStatus;
    updatingImagesStatus: RequestStatus;
}

/**
 * Action Constants
 */

//
//
// Data
//
//
// prettier-ignore
export const START_REQUEST = 'current-space/START_REQUEST';
// prettier-ignore
export const RECEIVE_REQUEST = 'current-space/RECEIVE_REQUEST';
// prettier-ignore
export const FAIL_REQUEST = 'current-space/FAIL_REQUEST';
// prettier-ignore
export const RESET_DATA = 'current-space/RESET_DATA';

//
//
// Space description
//
//
// prettier-ignore
export const START_UPDATE_SD = 'current-space/START_UPDATE_SD';
// prettier-ignore
export const SUCCEED_UPDATE_SD = 'current-space/SUCCEED_UPDATE_SD';
// prettier-ignore
export const FAIL_UPDATE_SD = 'current-space/FAIL_UPDATE_SD';

//
//
// Images
//
//
// prettier-ignore
export const START_UPDATE_IMAGES = 'current-space/START_UPDATE_IMAGES';
// prettier-ignore
export const SUCCEED_UPDATE_IMAGES = 'current-space/SUCCEED_UPDATE_IMAGES';
// prettier-ignore
export const FAIL_UPDATE_IMAGES = 'current-space/FAIL_UPDATE_IMAGES';

/**
 * Action Interfaces
 */

//
//
// Data
//
//
export interface StartRequestAction extends Action<typeof START_REQUEST> {}

export interface ReceiveRequestAction extends Action<typeof RECEIVE_REQUEST> {
    space: Space;
}

export interface FailRequestAction extends Action<typeof FAIL_REQUEST> {
    message: string;
}

export interface ResetDataAction extends Action<typeof RESET_DATA> {}

//
//
// Space description
//
//
export interface StartUpdateSDAction extends Action<typeof START_UPDATE_SD> {}

export interface SucceedUpdateSDAction
    extends Action<typeof SUCCEED_UPDATE_SD> {
    spaceDescription: string;
}

export interface FailUpdateSDAction extends Action<typeof FAIL_UPDATE_SD> {
    message: string;
}

//
//
// Images
//
//
export interface StartUpdateImagesAction
    extends Action<typeof START_UPDATE_IMAGES> {}

export interface SucceedUpdateImagesAction
    extends Action<typeof SUCCEED_UPDATE_IMAGES> {
    images: SpaceImage[];
}

export interface FailUpdateImagesAction
    extends Action<typeof FAIL_UPDATE_IMAGES> {
    message: string;
}

/**
 * Action Types
 */
export type Actions =
    //
    //
    // Data
    //
    //
    | StartRequestAction
    | ReceiveRequestAction
    | FailRequestAction
    | ResetDataAction
    //
    //
    // Space introduce
    //
    //
    | StartUpdateSDAction
    | SucceedUpdateSDAction
    | FailUpdateSDAction
    //
    //
    // Images
    //
    //
    | StartUpdateImagesAction
    | SucceedUpdateImagesAction
    | FailUpdateImagesAction;
