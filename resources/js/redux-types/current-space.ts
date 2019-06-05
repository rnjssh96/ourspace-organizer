import { Action } from 'redux';

import Space, { BusyLevel, AmenityTag } from '../model/space';

/**
 * Current Space State
 */
export type CurrentSpaceState = Space;

/**
 * Action Constants
 */
// prettier-ignore
export const UPDATE_SPACE_INTRODUCE = 'our-space-organizer/current-space/UPDATE_SPACE_INTRODUCE';
// prettier-ignore
export const SET_OPERATING_HOURS = 'our-space-organizer/current-space/SET_OPERATING_HOURS';
// prettier-ignore
export const SET_BUSY_LEVEL = 'our-space-organizer/current-space/SET_BUSY_LEVEL';
// prettier-ignore
export const SET_AMENITY_TAGS = 'our-space-organizer/current-space/SET_AMENITY_TAGS';

/**
 * Action Interfaces
 */
export interface UpdateSpaceIntroduceAction extends Action<typeof UPDATE_SPACE_INTRODUCE> {
    spaceIntroduce: string;
}

export interface SetOperatingHoursAction extends Action<typeof SET_OPERATING_HOURS> {
    operatingHours: string[];
}

export interface SetBusyLevelAction extends Action<typeof SET_BUSY_LEVEL> {
    busyLevel: BusyLevel;
}

export interface SetAmenityTagsAction extends Action<typeof SET_AMENITY_TAGS> {
    amenityTags: AmenityTag[];
}

/**
 * Action Types
 */
export type CurrentSpaceActions =
    | UpdateSpaceIntroduceAction
    | SetOperatingHoursAction
    | SetBusyLevelAction
    | SetAmenityTagsAction;
