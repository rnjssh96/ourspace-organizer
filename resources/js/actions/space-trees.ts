import { ActionCreator } from 'redux';

import SpaceTrees from '../model/space-tree';

import {
    SET_SPACE_TREES,
    SetSpaceTreesAction,

} from '../redux-types/space-trees';

/**
 * Action Creators
 */
export const setSpaceTrees: ActionCreator<SetSpaceTreesAction> = (
    spaceTrees: SpaceTrees,
) => ({
    type: SET_SPACE_TREES,
    spaceTrees,
});
