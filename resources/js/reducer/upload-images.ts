import {
    UploadImagesState,
    UploadImagesActions,
    ADD_UPLOAD_IMAGE,
    SET_IMAGE_DATA,
    UPDATE_UPLOAD_PROGRESS,
    RESET_UPLOAD_IMAGES,
    DELETE_UPLOAD_IMAGE,
} from '../redux-types/upload-images';

/**
 * Initial State
 */
const initialState: UploadImagesState = {
    imagesCount: 0,
    uploadImages: {},
};

/**
 * UploadImagesReducer
 */
export default function UploadImagesReducer(
    state = initialState,
    action: UploadImagesActions,
) {
    switch (action.type) {
        case RESET_UPLOAD_IMAGES:
            return {
                ...state,
                imagesCount: 0,
                uploadImages: {},
            };

        case ADD_UPLOAD_IMAGE:
            return {
                ...state,
                imagesCount: state.imagesCount + 1,
                uploadImages: {
                    ...state.uploadImages,
                    [action.key]: action.image,
                },
            };

        case UPDATE_UPLOAD_PROGRESS:
            return {
                ...state,
                uploadImages: {
                    ...state.uploadImages,
                    [action.key]: {
                        ...state.uploadImages[action.key],
                        progress: action.progress,
                    },
                },
            };

        case SET_IMAGE_DATA:
            return {
                ...state,
                uploadImages: {
                    ...state.uploadImages,
                    [action.key]: {
                        ...state.uploadImages[action.key],
                        dataURL: action.dataURL,
                    },
                },
            };

        case DELETE_UPLOAD_IMAGE:
            delete state.uploadImages[action.key];
            return {
                ...state,
                uploadImages: {
                    ...state.uploadImages,
                },
            };

        default:
            return state;
    }
}
