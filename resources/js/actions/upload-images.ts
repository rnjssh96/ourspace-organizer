import { ActionCreator } from 'redux';

import {
    UploadImage,

    RESET_UPLOAD_IMAGES,
    ResetUploadImagesAction,

    ADD_UPLOAD_IMAGE,
    AddUploadImageAction,

    UPDATE_UPLOAD_PROGRESS,
    UpdateUploadProgressAction,

    SET_IMAGE_DATA,
    SetImageDataAction,

    DELETE_UPLOAD_IMAGE,
    DeleteUploadImageAction,
} from '../redux-types/upload-images';

/**
 * Action Creators
 */
export const resetUploadImages: ActionCreator<
    ResetUploadImagesAction
> = () => ({
    type: RESET_UPLOAD_IMAGES,
});

export const addUploadImage: ActionCreator<AddUploadImageAction> = (
    key: number,
    image: UploadImage,
) => ({
    type: ADD_UPLOAD_IMAGE,
    key,
    image,
});

export const updateUploadProgress: ActionCreator<UpdateUploadProgressAction> = (
    key: number,
    progress: number,
) => ({
    type: UPDATE_UPLOAD_PROGRESS,
    key,
    progress,
});

export const setImageData: ActionCreator<SetImageDataAction> = (
    key: number,
    dataURL: string,
) => ({
    type: SET_IMAGE_DATA,
    key,
    dataURL,
});

export const deleteUploadImage: ActionCreator<DeleteUploadImageAction> = (
    key: number,
) => ({
    type: DELETE_UPLOAD_IMAGE,
    key,
});
