import { ActionCreator, Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import OSDBAxios from '../config/osdb-axios';

import { RawSpace, SpaceUpdate, encodeSpaceUpdate } from '../model/space';

import * as currentSpaceActions from '../actions/current-space';

import { requestSpace } from './current-space';
import { requestWholeSpaceList } from './space-list';

/**
 *
 *
 * Create new space on the server
 *
 *
 */
export const createNewSpace: ActionCreator<
    ThunkAction<void, any, null, Action<any>>
> = (organizerUID: string, newSpace: SpaceUpdate) => async (
    dispatch: ThunkDispatch<any, null, Action<any>>,
) => {
    try {
        const { data } = await OSDBAxios.post<RawSpace>('/organizer/space', {
            organizers: [organizerUID],
            ...encodeSpaceUpdate(newSpace),
        });
        dispatch(requestSpace(data));
        dispatch(requestWholeSpaceList());
    } catch (error) {
        dispatch(currentSpaceActions.failRequest(error.message));
    }
};
