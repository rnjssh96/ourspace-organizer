import { ActionCreator, Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosResponse } from 'axios';

import OSDBAxios from '../config/osdb-axios';

import { SpaceID, RawSpace } from '../model/space';
import { SpaceHeader } from '../model/space-list';

import * as spaceListActions from '../actions/space-list';

/**
 *
 *
 * Request space list data from the server
 *
 *
 */
export const requestSpaceList: ActionCreator<
    ThunkAction<void, any, null, Action<any>>
> = (sids: SpaceID[]) => async (
    dispatch: ThunkDispatch<any, null, Action<any>>,
) => {
    dispatch(spaceListActions.startRequest());

    try {
        const responses = await Promise.all(
            sids.map((sid: string) =>
                OSDBAxios.get<RawSpace>(`/ospace/${sid}`).then(
                    (response: AxiosResponse<RawSpace>) => {
                        return { sid: sid, response: response };
                    },
                ),
            ),
        );
        const spaceList: SpaceHeader[] = responses.map(
            ({
                sid,
                response,
            }: {
                sid: string;
                response: AxiosResponse<RawSpace>;
            }): SpaceHeader => ({
                id: sid,
                names: response.data.space_names,
            }),
        );
        dispatch(spaceListActions.receiveRequest(spaceList));
    } catch (error) {
        dispatch(spaceListActions.failRequest(error));
    }
};
