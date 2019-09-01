import { ActionCreator, Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import OSDBAxios from '../config/osdb-axios';

import {
    RawSpace,
    rawSpaces2SpaceList,
    SpaceUpdate,
    encodeSpaceUpdate,
} from '../model/space';

import * as currentSpaceActions from '../actions/current-space';

/**
 *
 *
 * Create new space on the server
 *
 *
 */
export const createNewSpace: ActionCreator<
    ThunkAction<void, any, null, Action<any>>
> = (newSpace: SpaceUpdate) => async (
    dispatch: ThunkDispatch<any, null, Action<any>>,
) => {
    try {
        // const { data } = await OSDBAxios.post<RawSpace>(
        //     '/organizer/space',
        //     encodeSpaceUpdate(newSpace),
        // );
        // dispatch(
        //     currentSpaceActions.finishRequest(
        //         rawSpaces2SpaceList(spaceID, data),
        //     ),
        // );
    } catch (error) {
        dispatch(currentSpaceActions.failRequest(error.message));
    }
};
