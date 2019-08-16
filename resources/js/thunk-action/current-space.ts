import { ActionCreator, Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import OSDBAxios from '../config/osdb-axios';
import OSFirebase from '../config/firebase';

import { RawSpace, rawSpaces2SpaceList, SpaceID } from '../model/space';

import * as currentSpaceActions from '../actions/current-space';
import { pushIntoSpaceHistory } from '../actions/space-history';

/**
 *
 *
 * Request space data from the server
 *
 *
 */
export const requestSpace: ActionCreator<
    ThunkAction<void, any, null, Action<any>>
> = (spaceID: string, pushHistory: boolean = false) => async (
    dispatch: ThunkDispatch<any, null, Action<any>>,
) => {
    dispatch(currentSpaceActions.startRequest());
    try {
        const { data } = await OSDBAxios.get<RawSpace>(
            `/organizer/space/single/${spaceID}`,
        );
        const space = rawSpaces2SpaceList(spaceID, data);
        dispatch(currentSpaceActions.receiveRequest(space));
        if (pushHistory) {
            dispatch(
                pushIntoSpaceHistory({
                    id: spaceID,
                    names: space.spaceNames,
                }),
            );
        }
    } catch (error) {
        dispatch(currentSpaceActions.failRequest(error.message));
    }
};

/**
 *
 *
 * Update space description of the space on server
 *
 *
 */
export const updateSpaceDescription: ActionCreator<
    ThunkAction<void, any, null, Action<any>>
> = (spaceID: string, spaceDescription: string) => async (
    dispatch: ThunkDispatch<any, null, Action<any>>,
) => {
    dispatch(currentSpaceActions.startUpdateSD());
    try {
        const { data } = await OSDBAxios.post<{ updated_space_id: SpaceID }>(
            `/ospace/${spaceID}`,
            {
                captions: {
                    description: spaceDescription,
                },
            },
        );
        if (data.updated_space_id === spaceID) {
            dispatch(currentSpaceActions.succeedUpdateSD(spaceDescription));
        } else {
            dispatch(
                currentSpaceActions.failUpdateSD('업데이트에 실패했습니다.'),
            );
        }
    } catch (error) {
        dispatch(currentSpaceActions.failUpdateSD(error.message));
    }
};

/**
 *
 *
 * Update space images of the space on server
 *
 *
 */
import { UploadImagesMap, UploadImage } from '../redux-types/upload-images';

export const updateImages: ActionCreator<
    ThunkAction<void, any, null, Action<any>>
> = (
    spaceID: string,
    spaceImages: string[],
    uploadings: UploadImagesMap,
) => async (dispatch: ThunkDispatch<any, null, Action<any>>) => {
    dispatch(currentSpaceActions.startUpdateImages());

    const uploadingImages = Object.values(uploadings);
    try {
        let tasks = await Promise.all(
            uploadingImages.map((uploadImage: UploadImage) => {
                if (uploadImage.progress >= 100) {
                    return OSFirebase.storage()
                        .ref(`${spaceID}/${uploadImage.key}`)
                        .put(uploadImage.file)
                        .then(
                            (
                                uploadTask: OSFirebase.storage.UploadTaskSnapshot,
                            ) => uploadTask,
                        );
                }
            }),
        );
        await Promise.all(
            tasks.map((task: any) => {
                if (task) {
                    return task.ref.getDownloadURL().then((url: string) => {
                        spaceImages.push(url);
                    });
                }
            }),
        );
        const { data } = await OSDBAxios.post<{ updated_space_id: SpaceID }>(
            `/ospace/${spaceID}`,
            {
                images: spaceImages,
            },
        );
        if (data.updated_space_id === spaceID) {
            dispatch(currentSpaceActions.succeedUpdateImages(spaceImages));
        } else {
            dispatch(
                currentSpaceActions.failUpdateImages(
                    '업데이트에 실패했습니다.',
                ),
            );
        }
    } catch (error) {
        dispatch(currentSpaceActions.failUpdateImages(error.message));
    }
};
