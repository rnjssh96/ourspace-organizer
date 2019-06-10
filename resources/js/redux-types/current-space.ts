import { Action } from 'redux';

import Space, { BusyLevel, AmenityTag } from '../model/space';

/**
 * Current Space State
 */
export interface CurrentSpaceState {
    data?: Space;
    status: {
        requestingSpace: boolean;
        updatingOperatingHour: boolean;
        updatingAmentiyTags: boolean;
        updatingImages: boolean;
    };
}

/**
 * Action Constants
 */
// prettier-ignore
export const REQUEST_SPACE = 'current-space/REQUEST_SPACE';
// prettier-ignore
export const RECEIVE_SPACE = 'current-space/RECEIVE_SPACE';
// prettier-ignore
export const END_REQUEST_SPACE = 'current-space/END_REQUEST_SPACE';
// prettier-ignore
export const RESET_SPACE = 'current-space/RESET_SPACE';

// prettier-ignore
export const UPDATE_SPACE_INTRODUCE = 'current-space/UPDATE_SPACE_INTRODUCE';

// prettier-ignore
export const START_UPDATE_OH = 'current-space/START_UPDATE_OH';
// prettier-ignore
export const FINISH_UPDATE_OH = 'current-space/FINISH_UPDATE_OH';
// prettier-ignore
export const END_UPDATE_OH = 'current-space/END_UPDATE_OH';

// prettier-ignore
export const SET_BUSY_LEVEL = 'current-space/SET_BUSY_LEVEL';

// prettier-ignore
export const START_UPDATE_AT = 'current-space/START_UPDATE_AT';
// prettier-ignore
export const FINISH_UPDATE_AT = 'current-space/FINISH_UPDATE_AT';
// prettier-ignore
export const END_UPDATE_AT = 'current-space/END_UPDATE_AT';

// prettier-ignore
export const START_UPDATE_IMAGES = 'current-space/START_UPDATE_IMAGES';
// prettier-ignore
export const FINISH_UPDATE_IMAGES = 'current-space/FINISH_UPDATE_IMAGES';
// prettier-ignore
export const END_UPDATE_IMAGES = 'current-space/END_UPDATE_IMAGES';

/**
 * Action Interfaces
 */
export interface RequestSpaceAction extends Action<typeof REQUEST_SPACE> {}

export interface ReceiveSpaceAction extends Action<typeof RECEIVE_SPACE> {
    space: Space;
}

export interface EndRequestSpaceAction
    extends Action<typeof END_REQUEST_SPACE> {}

export interface ResetSpaceAction extends Action<typeof RESET_SPACE> {}

export interface UpdateSpaceIntroduceAction
    extends Action<typeof UPDATE_SPACE_INTRODUCE> {
    spaceIntroduce: string;
}

export interface StartUpdateOHAction extends Action<typeof START_UPDATE_OH> {}

export interface FinishUpdateOHAction extends Action<typeof FINISH_UPDATE_OH> {
    operatingHours: string[];
}

export interface EndUpdateOHAction extends Action<typeof END_UPDATE_OH> {}

export interface SetBusyLevelAction extends Action<typeof SET_BUSY_LEVEL> {
    busyLevel: BusyLevel;
}

export interface StartUpdateATAction extends Action<typeof START_UPDATE_AT> {}

export interface FinishUpdateATAction extends Action<typeof FINISH_UPDATE_AT> {
    amenityTags: AmenityTag[];
}

export interface EndUpdateATAction extends Action<typeof END_UPDATE_AT> {}

export interface StartUpdateImagesAction
    extends Action<typeof START_UPDATE_IMAGES> {}

export interface FinishUpdateImagesAction
    extends Action<typeof FINISH_UPDATE_IMAGES> {
    images: string[];
}

export interface EndUpdateImagesAction
    extends Action<typeof END_UPDATE_IMAGES> {}

/**
 * Action Types
 */
export type CurrentSpaceActions =
    | RequestSpaceAction
    | ReceiveSpaceAction
    | EndRequestSpaceAction
    | ResetSpaceAction
    | UpdateSpaceIntroduceAction
    | StartUpdateOHAction
    | FinishUpdateOHAction
    | EndUpdateOHAction
    | SetBusyLevelAction
    | StartUpdateATAction
    | FinishUpdateATAction
    | EndUpdateATAction
    | StartUpdateImagesAction
    | FinishUpdateImagesAction
    | EndUpdateImagesAction;
