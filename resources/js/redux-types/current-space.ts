import { Action } from 'redux';

import Space, { SpaceImage } from '../model/space';
import { DataStatus, SpaceDataStatus } from '../model/system';

/**
 * State
 */
export interface State {
    data?: Space;
    dataStatus: SpaceDataStatus;
    imagesStatus: DataStatus;
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
export const FINISH_REQUEST = 'current-space/FINISH_REQUEST';
// prettier-ignore
export const FAIL_REQUEST = 'current-space/FAIL_REQUEST';
// prettier-ignore
export const RESET_DATA = 'current-space/RESET_DATA';

//
//
// Images
//
//
// prettier-ignore
export const START_IMAGES_UPDATE = 'current-space/START_IMAGES_UPDATE';
// prettier-ignore
export const FINISH_IMAGES_UPDATE = 'current-space/FINISH_IMAGES_UPDATE';
// prettier-ignore
export const FAIL_IMAGES_UPDATE = 'current-space/FAIL_IMAGES_UPDATE';

/**
 * Action Interfaces
 */

//
//
// Data
//
//
export interface StartRequestAction extends Action<typeof START_REQUEST> {}

export interface FinishRequestAction extends Action<typeof FINISH_REQUEST> {
    space: Space;
}

export interface FailRequestAction extends Action<typeof FAIL_REQUEST> {
    message: string;
}

export interface ResetDataAction extends Action<typeof RESET_DATA> {}

//
//
// Images
//
//
export interface StartImagesUpdateAction
    extends Action<typeof START_IMAGES_UPDATE> {}

export interface FinishImagesUpdateAction
    extends Action<typeof FINISH_IMAGES_UPDATE> {
    images: SpaceImage[];
}

export interface FailImagesUpdateAction
    extends Action<typeof FAIL_IMAGES_UPDATE> {
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
    | FinishRequestAction
    | FailRequestAction
    | ResetDataAction
    //
    //
    // Images
    //
    //
    | StartImagesUpdateAction
    | FinishImagesUpdateAction
    | FailImagesUpdateAction;
