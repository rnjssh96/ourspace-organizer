import { ActionCreator } from 'redux';

import * as redux_types from '../redux-types/space-history';

import { SpaceHeader } from '../model/space-list';

/**
 * Action Creators
 */
export const resetSpaceHistory: ActionCreator<
    redux_types.ResetSpaceHistoryAction
> = () => ({
    type: redux_types.RESET_SPACE_HISTORY,
});

export const pushIntoSpaceHistory: ActionCreator<
    redux_types.PushIntoSpaceHistoryAction
> = (spaceHeader: SpaceHeader) => ({
    type: redux_types.PUSH_INTO_SPACE_HISTORY,
    spaceHeader,
});
