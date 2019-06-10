import { ActionCreator } from 'redux';

import Space, { BusyLevel, AmenityTag } from '../model/space';
import {
    UPDATE_SPACE_INTRODUCE,
    UpdateSpaceIntroduceAction,
    SET_BUSY_LEVEL,
    SetBusyLevelAction,
    RequestSpaceAction,
    ReceiveSpaceAction,
    REQUEST_SPACE,
    RECEIVE_SPACE,
    EndRequestSpaceAction,
    END_REQUEST_SPACE,
    StartUpdateOHAction,
    FinishUpdateOHAction,
    START_UPDATE_OH,
    FINISH_UPDATE_OH,
    EndUpdateOHAction,
    END_UPDATE_OH,
    ResetSpaceAction,
    RESET_SPACE,
    StartUpdateATAction,
    FinishUpdateATAction,
    EndUpdateATAction,
    START_UPDATE_AT,
    END_UPDATE_AT,
    FINISH_UPDATE_AT,
} from '../redux-types/current-space';

/**
 * Action Creators
 */
export const requestSpace: ActionCreator<RequestSpaceAction> = () => ({
    type: REQUEST_SPACE,
});

export const receiveSpace: ActionCreator<ReceiveSpaceAction> = (
    space: Space,
) => ({
    type: RECEIVE_SPACE,
    space,
});

export const endRequestSpace: ActionCreator<EndRequestSpaceAction> = () => ({
    type: END_REQUEST_SPACE,
});

export const resetSpace: ActionCreator<ResetSpaceAction> = () => ({
    type: RESET_SPACE,
});

export const updateSpaceIntroduce: ActionCreator<UpdateSpaceIntroduceAction> = (
    spaceIntroduce: string,
) => ({
    type: UPDATE_SPACE_INTRODUCE,
    spaceIntroduce,
});

export const startUpdateOH: ActionCreator<StartUpdateOHAction> = () => ({
    type: START_UPDATE_OH,
});

export const finishUpdateOH: ActionCreator<FinishUpdateOHAction> = (
    operatingHours: string[],
) => ({
    type: FINISH_UPDATE_OH,
    operatingHours,
});

export const endUpdateOH: ActionCreator<EndUpdateOHAction> = () => ({
    type: END_UPDATE_OH,
});

export const setBusyLevel: ActionCreator<SetBusyLevelAction> = (
    busyLevel: BusyLevel,
) => ({
    type: SET_BUSY_LEVEL,
    busyLevel,
});

export const startUpdateAT: ActionCreator<StartUpdateATAction> = () => ({
    type: START_UPDATE_AT,
});

export const finishUpdateAT: ActionCreator<FinishUpdateATAction> = (
    amenityTags: AmenityTag[],
) => ({
    type: FINISH_UPDATE_AT,
    amenityTags,
});

export const endUpdateAT: ActionCreator<EndUpdateATAction> = () => ({
    type: END_UPDATE_AT,
});
