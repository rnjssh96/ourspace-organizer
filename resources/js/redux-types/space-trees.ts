import SpaceTrees from '../model/space-tree';
import { Action } from 'redux';

/**
 * Space Trees State
 */
export type SpaceTreesState = {
    data: SpaceTrees;
    status: {
        requestingSpaceTrees: boolean;
    };
};

/**
 * Action Constants
 */
// prettier-ignore
export const REQUEST_SPACE_TREES = 'space-tree/REQUEST_SPACE_TREES';
// prettier-ignore
export const RECEIVE_SPACE_TREES = 'space-tree/RECEIVE_SPACE_TREES';

/**
 * Action Interfacess
 */
export interface RequestSpaceTreesAction
    extends Action<typeof REQUEST_SPACE_TREES> {}

export interface ReceiveSpaceTreesAction
    extends Action<typeof RECEIVE_SPACE_TREES> {
    spaceTrees: SpaceTrees;
}

/**
 * Action Types
 */
export type SpaceTreesActions =
    | RequestSpaceTreesAction
    | ReceiveSpaceTreesAction;
