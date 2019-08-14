import { ActionCreator, Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosResponse } from 'axios';

import OSDBAxios from '../config/osdb-axios';

import { SpaceID, RawSpace } from '../model/space';
import { SpaceHeader } from '../model/space-header';

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
        const spaceList: SpaceHeader[] = [
            {
                id: '1',
                names: {
                    en: '',
                    ko: '폴바셋 교보문고점',
                },
            },
            {
                id: '12',
                names: {
                    en: '',
                    ko: '아나바다 교보본점',
                },
            },
            {
                id: '13',
                names: {
                    en: '',
                    ko: '알라딘문고 잠실점',
                },
            },
        ];
        dispatch(spaceListActions.receiveRequest(spaceList));
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
        regex.test(space.names.ko),
    );

    dispatch(spaceSearchActions.finishSearch(result));
};
