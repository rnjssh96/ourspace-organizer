import { ActionCreator, Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { osdbGetSpace, osdbGetSpaceTrees } from '../db-api/space';

import SpaceTrees from '../model/space-tree';

import { ReceiveSpaceTreesAction } from '../redux-types/space-trees';
import { ReceiveSpaceAction } from '../redux-types/current-space';

import { requestSpaceTrees, receiveSpaceTrees } from './space-trees';
import { requestSpace, receiveSpace } from './current-space';

export const fetchSpaceTreesFromOSDB: ActionCreator<
    ThunkAction<void, SpaceTrees, null, ReceiveSpaceTreesAction>
> = () => async (dispatch: ThunkDispatch<SpaceTrees, null, Action<any>>) => {
    dispatch(requestSpaceTrees());
    osdbGetSpaceTrees('organizerUID').then(data => {
        dispatch(receiveSpaceTrees(data));
    });
};

export const fetchSpaceFromOSDB: ActionCreator<
    ThunkAction<void, SpaceTrees, null, ReceiveSpaceAction>
> = () => async (dispatch: ThunkDispatch<SpaceTrees, null, Action<any>>) => {
    dispatch(requestSpace());
    osdbGetSpace('RgnQ71NWGxlikEOjbIdr').then(data => {
        dispatch(receiveSpace(data));
    });
};
