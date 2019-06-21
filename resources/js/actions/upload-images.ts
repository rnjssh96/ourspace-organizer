import { ActionCreator } from 'redux';

import * as redux_types from '../redux-types/upload-images';

/**
 * Action Creators
 */
export const resetUploadImages: ActionCreator<
    redux_types.ResetUploadImagesAction
> = () => ({
    type: redux_types.RESET_UPLOAD_IMAGES,
});

export const addUploadImage: ActionCreator<redux_types.AddUploadImageAction> = (
    key: number,
    image: redux_types.UploadImage,
) => ({
    type: redux_types.ADD_UPLOAD_IMAGE,
    key,
    image,
});

export const updateUploadProgress: ActionCreator<
    redux_types.UpdateUploadProgressAction
> = (key: number, progress: number) => ({
    type: redux_types.UPDATE_UPLOAD_PROGRESS,
    key,
    progress,
});

export const setImageData: ActionCreator<redux_types.SetImageDataAction> = (
    key: number,
    dataURL: string,
) => ({
    type: redux_types.SET_IMAGE_DATA,
    key,
    dataURL,
});

export const deleteUploadImage: ActionCreator<
    redux_types.DeleteUploadImageAction
> = (key: number) => ({
    type: redux_types.DELETE_UPLOAD_IMAGE,
    key,
});
