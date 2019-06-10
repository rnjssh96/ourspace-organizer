import { ActionCreator, Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import OSFirebase from '../config/firebase';

import { UploadImagesMap } from '../redux-types/upload-images';
import { updateImages } from './osdb-api';
import { startUpdateImages } from './current-space';

/**
 * Upload images to server
 */
export const uploadImagesToServer: ActionCreator<
    ThunkAction<void, string[], null, Action<any>>
> = (
    spaceID: string,
    images: UploadImagesMap,
    currentImages: string[],
) => async (dispatch: ThunkDispatch<string[], null, Action<any>>) => {
    dispatch(startUpdateImages());
    let uploadedImages: string[] = [];
    images = Object.values(images);
    for (let idx in images) {
        if (images[idx].progress >= 100) {
            const uploadTask = OSFirebase.storage()
                .ref(`${spaceID}/${images[idx].key}`)
                .put(images[idx].file);
            await uploadTask.then(async () => {
                await OSFirebase.storage()
                    .ref(spaceID)
                    .child(`${images[idx].key}`)
                    .getDownloadURL()
                    .then(url => {
                        uploadedImages.push(url);
                    });
            });
        }
    }
    dispatch(updateImages(spaceID, [...currentImages, ...uploadedImages]));
};
