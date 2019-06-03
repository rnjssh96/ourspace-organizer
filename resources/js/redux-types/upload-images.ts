/**
 * Upload Images State
 */
export interface UploadImage {
    key: number;
    name: string;
    size: number;
    dataURL?: string;
    progress: number;
}
export type UploadImagesMap = { [key in number]: UploadImage };
export type UploadImagesState = {
    imagesCount: number;
    uploadImages: UploadImagesMap;
};

/**
 * Action Constants
 */
// prettier-ignore
export const RESET_UPLOAD_IMAGES = 'our-space-organizer/upload-images/RESET_UPLOAD_IMAGES';
// prettier-ignore
export const ADD_UPLOAD_IMAGE = 'our-space-organizer/upload-images/ADD_UPLOAD_IMAGE';
// prettier-ignore
export const UPDATE_UPLOAD_PROGRESS = 'our-space-organizer/upload-images/UPDATE_UPLOAD_PROGRESS';
// prettier-ignore
export const SET_IMAGE_DATA = 'our-space-organizer/upload-images/SET_IMAGE_DATA';
// prettier-ignore
export const DELETE_UPLOAD_IMAGE = 'our-space-organizer/upload-images/DELETE_UPLOAD_IMAGE';

/**
 * Action Interfaces
 */
export interface ResetUploadImagesAction {
    type: typeof RESET_UPLOAD_IMAGES;
}

export interface AddUploadImageAction {
    type: typeof ADD_UPLOAD_IMAGE;
    key: number;
    image: UploadImage;
}

export interface UpdateUploadProgressAction {
    type: typeof UPDATE_UPLOAD_PROGRESS;
    key: number;
    progress: number;
}

export interface SetImageDataAction {
    type: typeof SET_IMAGE_DATA;
    key: number;
    dataURL: string;
}

export interface DeleteUploadImageAction {
    type: typeof DELETE_UPLOAD_IMAGE;
    key: number;
}

/**
 * Action Types
 */
export type UploadImagesActions =
    | ResetUploadImagesAction
    | AddUploadImageAction
    | UpdateUploadProgressAction
    | SetImageDataAction
    | DeleteUploadImageAction;
