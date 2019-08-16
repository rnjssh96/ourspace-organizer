import { ActionCreator } from 'redux';

import * as redux_types from '../redux-types/space-list';

import { SpaceHeader } from '../model/space-header';

/**
 * Action Creators
 */
export const startRequest: ActionCreator<
    redux_types.StartRequestAction
> = () => ({
    type: redux_types.START_REQUEST,
});

export const finishRequest: ActionCreator<redux_types.FinishRequestAction> = (
    data: SpaceHeader[],
) => ({
    type: redux_types.FINISH_REQUEST,
    data,
});

export const failRequest: ActionCreator<redux_types.FailRequestAction> = (
    message: string,
) => ({
    type: redux_types.FAIL_REQUEST,
    message,
});

export const resetData: ActionCreator<redux_types.ResetDataAction> = () => ({
    type: redux_types.RESET_DATA,
});
