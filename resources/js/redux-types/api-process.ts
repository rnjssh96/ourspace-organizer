import { Action } from 'redux';

/**
 * API Process State
 */
export type APIProcessState = {
    currentSpace: {
        spaceFetching: boolean;
    };
};

/**
 * Action Constants
 */
// prettier-ignore
export const SET_SPACE_FETCHING = 'current-space/SET_SPACE_FETCHING';

// prettier-ignore
export const FETCH_SPACE_FROM_SERVER = 'current-space/thunk/FETCH_SPACE_FROM_SERVER';

/**
 * Action Interfaces
 */
export interface SetSpaceFetchingAction
    extends Action<typeof SET_SPACE_FETCHING> {
    spaceFetching: boolean;
}

export type FetchSpaceFromServerAction = () => Promise<SetSpaceFetchingAction>;

/**
 * Action Types
 */
export type APIProcessActions =
    | SetSpaceFetchingAction;
