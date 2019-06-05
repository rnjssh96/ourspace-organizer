import SpaceTrees from "../model/space-tree";

import { SetSpaceTreesAction, SET_SPACE_TREES } from "../redux-types/space-trees";

/**
 * Action Creators
 */
export const setSpaceTrees = (
    spaceTrees: SpaceTrees,
): SetSpaceTreesAction => ({
    type: SET_SPACE_TREES,
    spaceTrees,
});