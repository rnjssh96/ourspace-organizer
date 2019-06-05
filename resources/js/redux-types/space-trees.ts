import SpaceTrees from '../model/space-tree';
import { Action } from 'redux';

/**
 * Space Trees State
 */
export type SpaceTreesState = {
    data: SpaceTrees
};

/**
 * Action Constants
 */
// prettier-ignore
export const SET_SPACE_TREES = 'our-space-organizer/space-tree/SET_SPACE_TREES';

/**
 * Action Interfaces
 */
export interface SetSpaceTreesAction extends Action<typeof SET_SPACE_TREES> {
    spaceTrees: SpaceTrees;
}

/**
 * Action Types
 */
export type SpaceTreesActions = SetSpaceTreesAction;
