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

export const receiveRequest: ActionCreator<redux_types.ReceiveRequestAction> = (
    data: SpaceHeader[],
) => ({
    type: redux_types.RECEIVE_REQUEST,
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
