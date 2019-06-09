import { ActionCreator, Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import Space from '../model/space';
import SpaceTrees from '../model/space-tree';

import { osdbGetSpace, osdbGetSpaceTrees } from '../osdb-api/space';

import { ReceiveSpaceTreesAction } from '../redux-types/space-trees';
import { ReceiveSpaceAction } from '../redux-types/current-space';

import { requestSpaceTrees, receiveSpaceTrees } from './space-trees';
import { requestSpace, receiveSpace } from './current-space';

/**
 * Fetch space trees from OSDB
 */
export const fetchSpaceTrees: ActionCreator<
    ThunkAction<void, SpaceTrees, null, ReceiveSpaceTreesAction>
> = (organizerUID: string) => async (dispatch: ThunkDispatch<SpaceTrees, null, Action<any>>) => {
    dispatch(requestSpaceTrees());
    osdbGetSpaceTrees(organizerUID).then((spaceTrees: SpaceTrees) => {
        dispatch(receiveSpaceTrees(spaceTrees));
    });
};

/**
 * Fetch space from OSDB
 */
export const fetchSpace: ActionCreator<
    ThunkAction<void, Space, null, ReceiveSpaceAction>
> = () => async (dispatch: ThunkDispatch<Space, null, Action<any>>) => {
    dispatch(requestSpace());
    osdbGetSpace('RgnQ71NWGxlikEOjbIdr').then((space: Space) => {
        dispatch(receiveSpace(space));
    });
};
