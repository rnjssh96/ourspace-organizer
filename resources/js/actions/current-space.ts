import { ActionCreator } from 'redux';

import * as redux_types from '../redux-types/current-space';

import Space, { BusyLevel, AmenityTag } from '../model/space';

/**
 * Action Creators
 */
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

export const updateSpaceDescription: ActionCreator<
    redux_types.UpdateSpaceDescriptionAction
> = (spaceDescription: string) => ({
    type: redux_types.UPDATE_SPACE_DESCRIPTION,
    spaceDescription,
});

export const startUpdateOH: ActionCreator<
    redux_types.StartUpdateOHAction
> = () => ({
    type: redux_types.START_UPDATE_OH,
});

export const succeedUpdateOH: ActionCreator<
    redux_types.SucceedUpdateOHAction
> = (operatingHours: string[]) => ({
    type: redux_types.SUCCEED_UPDATE_OH,
    operatingHours,
});

export const failUpdateOH: ActionCreator<redux_types.FailUpdateOHAction> = (
    message: string,
) => ({
    type: redux_types.FAIL_UPDATE_OH,
    message,
});

export const setBusyLevel: ActionCreator<redux_types.SetBusyLevelAction> = (
    busyLevel: BusyLevel,
) => ({
    type: redux_types.SET_BUSY_LEVEL,
    busyLevel,
});

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
