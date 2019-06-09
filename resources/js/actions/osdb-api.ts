import { ActionCreator, Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import Space from '../model/space';
import SpaceTrees from '../model/space-tree';

import { osdbGetSpace, osdbGetSpaceTrees } from '../osdb-api/space';

import { ReceiveSpaceTreesAction } from '../redux-types/space-trees';
import { ReceiveSpaceAction } from '../redux-types/current-space';

import { requestSpaceTrees, receiveSpaceTrees, endRequestSpaceTrees } from './space-trees';
import { requestSpace, receiveSpace, endRequestSpace } from './current-space';

/**
 * Fetch space trees from OSDB
 */
export const fetchSpaceTrees: ActionCreator<
    ThunkAction<void, SpaceTrees, null, ReceiveSpaceTreesAction>
> = (organizerUID: string) => async (
    dispatch: ThunkDispatch<SpaceTrees, null, Action<any>>,
) => {
    dispatch(requestSpaceTrees());
    osdbGetSpaceTrees(organizerUID).then((spaceTrees: SpaceTrees) => {
        dispatch(receiveSpaceTrees(spaceTrees));
    }).catch(() => dispatch(endRequestSpaceTrees()));
};

/**
 * Fetch space from OSDB
 */
export const fetchSpace: ActionCreator<
    ThunkAction<void, Space, null, ReceiveSpaceAction>
> = (spaceID: string) => async (
    dispatch: ThunkDispatch<Space, null, Action<any>>,
) => {
    dispatch(requestSpace());
    osdbGetSpace(spaceID).then((space: Space) => {
        dispatch(receiveSpace(space));
    }).catch(() => dispatch(endRequestSpace()));
};
