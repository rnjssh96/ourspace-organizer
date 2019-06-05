import SpaceTrees from '../model/space-tree';

/**
 * Space Trees State
 */
export type SpaceTreesState = SpaceTrees;

/**
 * Action Constants
 */
// prettier-ignore
export const SET_SPACE_TREES = 'our-space-organizer/space-tree/SET_SPACE_TREES';

/**
 * Action Interfaces
 */
export interface SetSpaceTreesAction {
    type: typeof SET_SPACE_TREES;
    spaceTrees: SpaceTrees;
}

/**
 * Action Types
 */
export type SpaceTreesActions = SetSpaceTreesAction;
