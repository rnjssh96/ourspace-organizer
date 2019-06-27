import { Action } from 'redux';

import Space, { BusyLevel, AmenityTag, SpaceGeneralInfo } from '../model/space';
import { RequestStatus } from '../model/system';

/**
 * State
 */
export interface State {
    data?: Space;
    requestingStatus: RequestStatus;
    updatingGIStatus: RequestStatus;
    updatingSDStatus: RequestStatus;
    updatingATStatus: RequestStatus;
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
// General information
//
//
// prettier-ignore
export const START_UPDATE_GI = 'current-space/START_UPDATE_GI';
// prettier-ignore
export const SUCCEED_UPDATE_GI = 'current-space/SUCCEED_UPDATE_GI';
// prettier-ignore
export const FAIL_UPDATE_GI = 'current-space/FAIL_UPDATE_GI';

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
// Amenity tags
//
//
// prettier-ignore
export const START_UPDATE_AT = 'current-space/START_UPDATE_AT';
// prettier-ignore
export const SUCCEED_UPDATE_AT = 'current-space/SUCCEED_UPDATE_AT';
// prettier-ignore
export const FAIL_UPDATE_AT = 'current-space/FAIL_UPDATE_AT';

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

//
//
// Busy level
//
//
// prettier-ignore
export const SET_BUSY_LEVEL = 'current-space/SET_BUSY_LEVEL';

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
// General information
//
//
export interface StartUpdateGIAction extends Action<typeof START_UPDATE_GI> {}

export interface SucceedUpdateGIAction
    extends Action<typeof SUCCEED_UPDATE_GI> {
    generalInfo: SpaceGeneralInfo;
}

export interface FailUpdateGIAction extends Action<typeof FAIL_UPDATE_GI> {
    message: string;
}

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
// Amenity tags
//
//
export interface StartUpdateATAction extends Action<typeof START_UPDATE_AT> {}

export interface SucceedUpdateATAction
    extends Action<typeof SUCCEED_UPDATE_AT> {
    amenityTags: AmenityTag[];
}

export interface FailUpdateATAction extends Action<typeof FAIL_UPDATE_AT> {
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
    images: string[];
}

export interface FailUpdateImagesAction
    extends Action<typeof FAIL_UPDATE_IMAGES> {
    message: string;
}

//
//
// Busy level
//
//
export interface SetBusyLevelAction extends Action<typeof SET_BUSY_LEVEL> {
    busyLevel: BusyLevel;
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
    // General information
    //
    //
    | StartUpdateGIAction
    | SucceedUpdateGIAction
    | FailUpdateGIAction
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
    // Amenity tags
    //
    //
    | StartUpdateATAction
    | SucceedUpdateATAction
    | FailUpdateATAction
    //
    //
    // Images
    //
    //
    | StartUpdateImagesAction
    | SucceedUpdateImagesAction
    | FailUpdateImagesAction
    //
    //
    // Busy level
    //
    //
    | SetBusyLevelAction;
