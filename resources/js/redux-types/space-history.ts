import { Action } from 'redux';

import SpaceHistory from '../model/space-history';
import { SpaceHeader } from '../model/space-header';

/**
 * Space History State
 */
export interface SpaceHistoryState {
    data: SpaceHistory;
}

/**
 * Action Constants
 */
// prettier-ignore
export const RESET_SPACE_HISTORY = 'current-space/RESET_SPACE_HISTORY';
// prettier-ignore
export const PUSH_INTO_SPACE_HISTORY = 'current-space/PUSH_INTO_SPACE_HISTORY';

/**
 * Action Interfacess
 */
export interface ResetSpaceHistoryAction
    extends Action<typeof RESET_SPACE_HISTORY> {}

export interface PushIntoSpaceHistoryAction
    extends Action<typeof PUSH_INTO_SPACE_HISTORY> {
    spaceHeader: SpaceHeader;
}

/**
 * Action Types
 */
export type SpaceHistoryActions =
    | ResetSpaceHistoryAction
    | PushIntoSpaceHistoryAction;
