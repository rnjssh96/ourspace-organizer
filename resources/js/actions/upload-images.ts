import {
    UploadImage,
    AddUploadImageAction,
    ADD_UPLOAD_IMAGE,
    SET_IMAGE_DATA,
    UPDATE_UPLOAD_PROGRESS,
    UpdateUploadProgressAction,
    SetImageDataAction,
    ResetUploadImagesAction,
    RESET_UPLOAD_IMAGES,
    DeleteUploadImageAction,
    DELETE_UPLOAD_IMAGE,
} from '../redux-types/upload-images';

/**
 * Action Creators
 */
export const resetUploadImages = (): ResetUploadImagesAction => ({
    type: RESET_UPLOAD_IMAGES,
});

export const addUploadImage = (
    key: number,
    image: UploadImage,
): AddUploadImageAction => ({
    type: ADD_UPLOAD_IMAGE,
    key,
    image,
});

export const updateUploadProgress = (
    key: number,
    progress: number,
): UpdateUploadProgressAction => ({
    type: UPDATE_UPLOAD_PROGRESS,
    key,
    progress,
});

export const setImageData = (
    key: number,
    dataURL: string,
): SetImageDataAction => ({
    type: SET_IMAGE_DATA,
    key,
    dataURL,
});

export const deleteUploadImage = (key: number): DeleteUploadImageAction => ({
    type: DELETE_UPLOAD_IMAGE,
    key,
});
