import { ActionCreator } from 'redux';

import * as redux_types from '../redux-types/current-space';

import Space, { BusyLevel, AmenityTag, SpaceGeneralInfo } from '../model/space';

/**
 * Action Creators
 */

//
//
// Data
//
//
export const startRequest: ActionCreator<
    redux_types.StartRequestAction
> = () => ({
    type: redux_types.START_REQUEST,
});

export const receiveRequest: ActionCreator<redux_types.ReceiveRequestAction> = (
    space: Space,
) => ({
    type: redux_types.RECEIVE_REQUEST,
    space,
});

export const failRequest: ActionCreator<redux_types.FailRequestAction> = (
    message: string,
) => ({
    type: redux_types.FAIL_REQUEST,
    message,
});

export const resetData: ActionCreator<redux_types.ResetDataAction> = () => ({
    type: redux_types.RESET_DATA,
});

//
//
// General information
//
//
export const startUpdateGI: ActionCreator<
    redux_types.StartUpdateGIAction
> = () => ({
    type: redux_types.START_UPDATE_GI,
});

export const succeedUpdateGI: ActionCreator<
    redux_types.SucceedUpdateGIAction
> = (generalInfo: SpaceGeneralInfo) => ({
    type: redux_types.SUCCEED_UPDATE_GI,
    generalInfo,
});

export const failUpdateGI: ActionCreator<redux_types.FailUpdateGIAction> = (
    message: string,
) => ({
    type: redux_types.FAIL_UPDATE_GI,
    message,
});

//
//
// Space description
//
//
export const startUpdateSD: ActionCreator<
    redux_types.StartUpdateSDAction
> = () => ({
    type: redux_types.START_UPDATE_SD,
});

export const succeedUpdateSD: ActionCreator<
    redux_types.SucceedUpdateSDAction
> = (spaceDescription: string) => ({
    type: redux_types.SUCCEED_UPDATE_SD,
    spaceDescription,
});

export const failUpdateSD: ActionCreator<redux_types.FailUpdateSDAction> = (
    message: string,
) => ({
    type: redux_types.FAIL_UPDATE_SD,
    message,
});

//
//
// Amenity tags
//
//
export const startUpdateAT: ActionCreator<
    redux_types.StartUpdateATAction
> = () => ({
    type: redux_types.START_UPDATE_AT,
});

export const succeedUpdateAT: ActionCreator<
    redux_types.SucceedUpdateATAction
> = (amenityTags: AmenityTag[]) => ({
    type: redux_types.SUCCEED_UPDATE_AT,
    amenityTags,
});

export const failUpdateAT: ActionCreator<redux_types.FailUpdateATAction> = (
    message: string,
) => ({
    type: redux_types.FAIL_UPDATE_AT,
    message,
});

//
//
// Images
//
//
export const startUpdateImages: ActionCreator<
    redux_types.StartUpdateImagesAction
> = () => ({
    type: redux_types.START_UPDATE_IMAGES,
});

export const succeedUpdateImages: ActionCreator<
    redux_types.SucceedUpdateImagesAction
> = (images: string[]) => ({
    type: redux_types.SUCCEED_UPDATE_IMAGES,
    images,
});

export const failUpdateImages: ActionCreator<
    redux_types.FailUpdateImagesAction
> = (message: string) => ({
    type: redux_types.FAIL_UPDATE_IMAGES,
    message,
});

//
//
// Busy level
//
//
export const setBusyLevel: ActionCreator<redux_types.SetBusyLevelAction> = (
    busyLevel: BusyLevel,
) => ({
    type: redux_types.SET_BUSY_LEVEL,
    busyLevel,
});
