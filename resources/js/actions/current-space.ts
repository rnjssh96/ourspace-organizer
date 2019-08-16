import { ActionCreator } from 'redux';

import * as redux_types from '../redux-types/current-space';

import Space, { SpaceImage } from '../model/space';

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

export const finishRequest: ActionCreator<redux_types.FinishRequestAction> = (
    space: Space,
) => ({
    type: redux_types.FINISH_REQUEST,
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
// Images
//
//
export const startUpdateImages: ActionCreator<
    redux_types.StartImagesUpdateAction
> = () => ({
    type: redux_types.START_IMAGES_UPDATE,
});

export const finishImagesUpdate: ActionCreator<
    redux_types.FinishImagesUpdateAction
> = (images: SpaceImage[]) => ({
    type: redux_types.FINISH_IMAGES_UPDATE,
    images,
});

export const failImagesUpdate: ActionCreator<
    redux_types.FailImagesUpdateAction
> = (message: string) => ({
    type: redux_types.FAIL_IMAGES_UPDATE,
    message,
});
