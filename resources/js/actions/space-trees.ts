import { ActionCreator } from 'redux';

import SpaceTrees from '../model/space-tree';

import { RequestSpaceTreesAction, ReceiveSpaceTreesAction, REQUEST_SPACE_TREES, RECEIVE_SPACE_TREES } from '../redux-types/space-trees';

/**
 * Action Creators
 */
export const requestSpaceTrees: ActionCreator<RequestSpaceTreesAction> = (
) => ({
    type: REQUEST_SPACE_TREES,
});

export const receiveSpaceTrees: ActionCreator<ReceiveSpaceTreesAction> = (
    spaceTrees: SpaceTrees,
) => ({
    type: RECEIVE_SPACE_TREES,
    spaceTrees,
});
