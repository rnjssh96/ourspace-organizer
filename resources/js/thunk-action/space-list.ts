import { ActionCreator, Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosResponse } from 'axios';

import OSDBAxios from '../config/osdb-axios';

import { SpaceID, RawSpace } from '../model/space';
import {
    SpaceHeader,
    RawSpaceHeaderMap,
    rawSpaceHeaderMap2SpaceHeaderList,
} from '../model/space-header';

import * as spaceListActions from '../actions/space-list';
import * as spaceSearchActions from '../actions/space-search';

import { requestSpace } from './current-space';

/**
 *
 *
 * Request space list data from the server
 *
 *
 */
export const requestSpaceList: ActionCreator<
    ThunkAction<void, any, null, Action<any>>
> = (spaceIDs: SpaceID[]) => async (
    dispatch: ThunkDispatch<any, null, Action<any>>,
) => {
    dispatch(spaceListActions.startRequest());

    try {
        const responses = await Promise.all(
            spaceIDs.map((id: string) =>
                OSDBAxios.get<RawSpace>(`/ospace/${id}`).then(
                    (response: AxiosResponse<RawSpace>) => {
                        return { spaceID: id, response: response };
                    },
                ),
            ),
        );
        const spaceList: SpaceHeader[] = responses.map(
            ({
                spaceID,
                response,
            }: {
                spaceID: string;
                response: AxiosResponse<RawSpace>;
            }): SpaceHeader => ({
                id: spaceID,
                spaceNames: response.data.space_names,
            }),
        );
        dispatch(spaceListActions.finishRequest(spaceList));

        // Set initial space
        if (spaceList.length > 0) {
            dispatch(requestSpace(spaceList[0].id));
        }
    } catch (error) {
        dispatch(spaceListActions.failRequest(error.message));
    }
};

/**
 *
 *
 * Request whole space list data from the server
 *
 *
 */
export const requestWholeSpaceList: ActionCreator<
    ThunkAction<void, any, null, Action<any>>
> = () => async (dispatch: ThunkDispatch<any, null, Action<any>>) => {
    dispatch(spaceListActions.startRequest());

    try {
        const { data } = await OSDBAxios.get<RawSpaceHeaderMap>(
            `organizer/space/all`,
        );

        const spaceList: SpaceHeader[] = rawSpaceHeaderMap2SpaceHeaderList(
            data,
        );
        dispatch(spaceListActions.finishRequest(spaceList));
    } catch (error) {
        dispatch(spaceListActions.failRequest(error.message));
    }
};

/**
 *
 *
 * Search space list from the whol space list
 *
 *
 */
export const searchSpaceList: ActionCreator<
    ThunkAction<void, any, null, Action<any>>
> = (spaceList: SpaceHeader[], query: string) => async (
    dispatch: ThunkDispatch<any, null, Action<any>>,
) => {
    if (query == '') {
        dispatch(spaceSearchActions.finishSearch([]));
        return;
    }

    const regex = new RegExp(query, 'i');

    const result = spaceList.filter((space: SpaceHeader) =>
        regex.test(space.spaceNames.ko),
    );

    dispatch(spaceSearchActions.finishSearch(result));
};
