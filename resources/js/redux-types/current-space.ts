import { Action } from 'redux';

import Space, { BusyLevel, AmenityTag } from '../model/space';
import { RequestStatus } from '../model/system';

/**
 * State
 */
export interface State {
    data?: Space;
    requestingStatus: RequestStatus;
    updatingOHStatus: RequestStatus;
    updatingATStatus: RequestStatus;
    updatingImagesStatus: RequestStatus;
}

/**
 * Action Constants
 */
// Current space data

// prettier-ignore
export const START_REQUEST = 'current-space/START_REQUEST';
// prettier-ignore
export const RECEIVE_REQUEST = 'current-space/RECEIVE_REQUEST';
// prettier-ignore
export const FAIL_REQUEST = 'current-space/FAIL_REQUEST';
// prettier-ignore
export const RESET_DATA = 'current-space/RESET_DATA';

// Space introduce

// prettier-ignore
export const UPDATE_SPACE_INTRODUCE = 'current-space/UPDATE_SPACE_INTRODUCE';

// Operating hour

// prettier-ignore
export const START_UPDATE_OH = 'current-space/START_UPDATE_OH';
// prettier-ignore
export const SUCCEED_UPDATE_OH = 'current-space/SUCCEED_UPDATE_OH';
// prettier-ignore
export const FAIL_UPDATE_OH = 'current-space/FAIL_UPDATE_OH';

// Busy level
// prettier-ignore
export const SET_BUSY_LEVEL = 'current-space/SET_BUSY_LEVEL';

// Amenity tags
// prettier-ignore
export const START_UPDATE_AT = 'current-space/START_UPDATE_AT';
// prettier-ignore
export const SUCCEED_UPDATE_AT = 'current-space/SUCCEED_UPDATE_AT';
// prettier-ignore
export const FAIL_UPDATE_AT = 'current-space/FAIL_UPDATE_AT';

// Images
// prettier-ignore
export const START_UPDATE_IMAGES = 'current-space/START_UPDATE_IMAGES';
// prettier-ignore
export const SUCCEED_UPDATE_IMAGES = 'current-space/SUCCEED_UPDATE_IMAGES';
// prettier-ignore
export const FAIL_UPDATE_IMAGES = 'current-space/FAIL_UPDATE_IMAGES';

/**
 * Action Interfaces
 */
// Current space data
export interface StartRequestAction extends Action<typeof START_REQUEST> {}

export interface ReceiveRequestAction extends Action<typeof RECEIVE_REQUEST> {
    space: Space;
}

export interface FailRequestAction extends Action<typeof FAIL_REQUEST> {
    message: string;
}

export interface ResetDataAction extends Action<typeof RESET_DATA> {}

// Space introduce
export interface UpdateSpaceIntroduceAction
    extends Action<typeof UPDATE_SPACE_INTRODUCE> {
    spaceIntroduce: string;
}

// Operating hour
export interface StartUpdateOHAction extends Action<typeof START_UPDATE_OH> {}

export interface SucceedUpdateOHAction
    extends Action<typeof SUCCEED_UPDATE_OH> {
    operatingHours: string[];
}

export interface FailUpdateOHAction extends Action<typeof FAIL_UPDATE_OH> {
    message: string;
}

// Busy level
export interface SetBusyLevelAction extends Action<typeof SET_BUSY_LEVEL> {
    busyLevel: BusyLevel;
}

// Amenity tags
export interface StartUpdateATAction extends Action<typeof START_UPDATE_AT> {}

export interface SucceedUpdateATAction
    extends Action<typeof SUCCEED_UPDATE_AT> {
    amenityTags: AmenityTag[];
}

export interface FailUpdateATAction extends Action<typeof FAIL_UPDATE_AT> {
    message: string;
}

// Images
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

/**
 * Action Types
 */
export type Actions =
    // Current space data
    | StartRequestAction
    | ReceiveRequestAction
    | FailRequestAction
    | ResetDataAction
    // Space introduce
    | UpdateSpaceIntroduceAction
    // Operating hour
    | StartUpdateOHAction
    | SucceedUpdateOHAction
    | FailUpdateOHAction
    // Busy level
    | SetBusyLevelAction
    // Amenity tags
    | StartUpdateATAction
    | SucceedUpdateATAction
    | FailUpdateATAction
    // Images
    | StartUpdateImagesAction
    | SucceedUpdateImagesAction
    | FailUpdateImagesAction;
