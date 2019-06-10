import { ActionCreator } from 'redux';

import {
    ResetSpaceHistoryAction,
    RESET_SPACE_HISTORY,
    PushIntoSpaceHistoryAction,
    PUSH_INTO_SPACE_HISTORY,
} from '../redux-types/space-history';
import { SpaceHeader } from '../model/space-header';

/**
 * Action Creators
 */
export const resetSpaceHistory: ActionCreator<
    ResetSpaceHistoryAction
> = () => ({
    type: RESET_SPACE_HISTORY,
});

export const pushIntoSpaceHistory: ActionCreator<PushIntoSpaceHistoryAction> = (
    spaceHeader: SpaceHeader,
) => ({
    type: PUSH_INTO_SPACE_HISTORY,
    spaceHeader,
});
