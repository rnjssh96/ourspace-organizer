import * as redux_types from '../redux-types/upload-images';

/**
 * Initial State
 */
const initialState: redux_types.State = {
    imagesCount: 0,
    uploadImages: {},
};

/**
 * UploadImagesReducer
 */
export default function UploadImagesReducer(
    state = initialState,
    action: redux_types.Actions,
): redux_types.State {
    switch (action.type) {
        case redux_types.RESET_UPLOAD_IMAGES:
            return {
                ...state,
                imagesCount: 0,
                uploadImages: {},
            };

        case redux_types.ADD_UPLOAD_IMAGE:
            return {
                ...state,
                imagesCount: state.imagesCount + 1,
                uploadImages: {
                    ...state.uploadImages,
                    [action.key]: action.image,
                },
            };

        case redux_types.UPDATE_UPLOAD_PROGRESS:
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

        case redux_types.SET_IMAGE_DATA:
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

        case redux_types.DELETE_UPLOAD_IMAGE:
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
