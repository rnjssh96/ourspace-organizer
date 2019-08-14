import { Action } from 'redux';

import { SpaceHeader } from '../model/space-header';

/**
 * State
 */
export interface State {
    result: SpaceHeader[];
}

/**
 * Action Constants
 */
// prettier-ignore
export const FINISH_SEARCH = 'space-search/FINISH_SEARCH';

export interface FinishSearchAction extends Action<typeof FINISH_SEARCH> {
    result: SpaceHeader[];
}

/**
 * Action Types
 */
export type Actions = FinishSearchAction;
