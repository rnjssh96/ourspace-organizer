import { Action } from 'redux';

import Space, { BusyLevel, AmenityTag } from '../model/space';

/**
 * Current Space State
 */
export type CurrentSpaceState = {
    data?: Space;
    status: {
        requestingSpace: boolean;
    }
};

/**
 * Action Constants
 */
// prettier-ignore
export const UPDATE_SPACE_INTRODUCE = 'current-space/UPDATE_SPACE_INTRODUCE';
// prettier-ignore
export const SET_OPERATING_HOURS = 'current-space/SET_OPERATING_HOURS';
// prettier-ignore
export const SET_BUSY_LEVEL = 'current-space/SET_BUSY_LEVEL';
// prettier-ignore
export const SET_AMENITY_TAGS = 'current-space/SET_AMENITY_TAGS';

// prettier-ignore
export const REQUEST_SPACE = 'current-space/REQUEST_SPACE';
// prettier-ignore
export const RECEIVE_SPACE = 'current-space/RECEIVE_SPACE';

/**
 * Action Interfaces
 */
export interface UpdateSpaceIntroduceAction
    extends Action<typeof UPDATE_SPACE_INTRODUCE> {
    spaceIntroduce: string;
}

export interface SetOperatingHoursAction
    extends Action<typeof SET_OPERATING_HOURS> {
    operatingHours: string[];
}

export interface SetBusyLevelAction extends Action<typeof SET_BUSY_LEVEL> {
    busyLevel: BusyLevel;
}

export interface SetAmenityTagsAction extends Action<typeof SET_AMENITY_TAGS> {
    amenityTags: AmenityTag[];
}

export interface RequestSpaceAction
    extends Action<typeof REQUEST_SPACE> {
}

export interface ReceiveSpaceAction
    extends Action<typeof RECEIVE_SPACE> {
    space: Space;
}

/**
 * Action Types
 */
export type CurrentSpaceActions =
    | UpdateSpaceIntroduceAction
    | SetOperatingHoursAction
    | SetBusyLevelAction
    | SetAmenityTagsAction
    | RequestSpaceAction
    | ReceiveSpaceAction;