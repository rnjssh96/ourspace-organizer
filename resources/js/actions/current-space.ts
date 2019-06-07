import { ActionCreator } from 'redux';

import Space, { BusyLevel, AmenityTag } from '../model/space';
import {
    UPDATE_SPACE_INTRODUCE,
    UpdateSpaceIntroduceAction,
    SET_OPERATING_HOURS,
    SetOperatingHoursAction,
    SET_BUSY_LEVEL,
    SetBusyLevelAction,
    SET_AMENITY_TAGS,
    SetAmenityTagsAction,
    RequestSpaceAction,
    ReceiveSpaceAction,
    REQUEST_SPACE,
    RECEIVE_SPACE,
} from '../redux-types/current-space';

/**
 * Action Creators
 */
export const updateSpaceIntroduce: ActionCreator<UpdateSpaceIntroduceAction> = (
    spaceIntroduce: string,
) => ({
    type: UPDATE_SPACE_INTRODUCE,
    spaceIntroduce,
});

export const setOperatingHours: ActionCreator<SetOperatingHoursAction> = (
    operatingHours: string[],
) => ({
    type: SET_OPERATING_HOURS,
    operatingHours,
});

export const setBusyLevel: ActionCreator<SetBusyLevelAction> = (
    busyLevel: BusyLevel,
) => ({
    type: SET_BUSY_LEVEL,
    busyLevel,
});

export const setAmenityTags: ActionCreator<SetAmenityTagsAction> = (
    amenityTags: AmenityTag[],
) => ({
    type: SET_AMENITY_TAGS,
    amenityTags,
});

export const requestSpace: ActionCreator<RequestSpaceAction> = (
) => ({
    type: REQUEST_SPACE,
});

export const receiveSpace: ActionCreator<ReceiveSpaceAction> = (
    space: Space,
) => ({
    type: RECEIVE_SPACE,
    space,
});