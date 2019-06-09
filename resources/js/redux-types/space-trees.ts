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
// prettier-ignore
export const END_REQUEST_SPACE_TREES = 'current-space/END_REQUEST_SPACE_TREES';

/**
 * Action Interfacess
 */
export interface RequestSpaceTreesAction
    extends Action<typeof REQUEST_SPACE_TREES> {}

export interface ReceiveSpaceTreesAction
    extends Action<typeof RECEIVE_SPACE_TREES> {
    spaceTrees: SpaceTrees;
}

export interface EndRequestSpaceTreesAction
    extends Action<typeof END_REQUEST_SPACE_TREES> {}

/**
 * Action Types
 */
export type SpaceTreesActions =
    | RequestSpaceTreesAction
    | ReceiveSpaceTreesAction
    | EndRequestSpaceTreesAction;
