import { ActionCreator, Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosResponse } from 'axios';

import OSDBAxios from '../config/osdb-axios';

import { SpaceID, RawSpace } from '../model/space';
import { RawSpaceHeader } from '../model/space-header';
import { buildArray2Tree } from '../model/space-tree';

import * as spaceTreesActions from '../actions/space-trees';

/**
 *
 *
 * Request space trees data from the server
 *
 *
 */
export const requestSpaceTrees: ActionCreator<
    ThunkAction<void, any, null, Action<any>>
> = (sids: SpaceID[]) => async (
    dispatch: ThunkDispatch<any, null, Action<any>>,
) => {
    dispatch(spaceTreesActions.startRequest());

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
        const spaceTrees = buildArray2Tree(
            responses.map(
                ({
                    sid,
                    response,
                }: {
                    sid: string;
                    response: AxiosResponse<RawSpace>;
                }): RawSpaceHeader => ({
                    id: sid,
                    pid: response.data.parent_space_id,
                    names: response.data.space_names,
                }),
            ),
        );
        dispatch(spaceTreesActions.receiveRequest(spaceTrees));
    } catch (error) {
        dispatch(spaceTreesActions.failRequest(error));
    }
};
