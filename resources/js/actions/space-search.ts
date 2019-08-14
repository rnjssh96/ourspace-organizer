import { ActionCreator } from 'redux';

import * as redux_types from '../redux-types/space-search';

import { SpaceHeader } from '../model/space-header';

/**
 * Action Creators
 */
export const finishSearch: ActionCreator<redux_types.FinishSearchAction> = (
    result: SpaceHeader[],
) => ({
    type: redux_types.FINISH_SEARCH,
    result,
});
