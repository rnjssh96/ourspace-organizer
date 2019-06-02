import Space, { BusyLevel, AmenityTag } from '../model/space';

/**
 * Current Space State
 */
export type CurrentSpaceState = Space;

/**
 * Action Constants
 */
// prettier-ignore
export const SET_OPERATING_HOURS = 'our-space-organizer/current-space/SET_OPERATING_HOURS';
// prettier-ignore
export const SET_BUSY_LEVEL = 'our-space-organizer/current-space/SET_BUSY_LEVEL';
// prettier-ignore
export const SET_AMENITY_TAGS = 'our-space-organizer/current-space/SET_AMENITY_TAGS';

/**
 * Action Interfaces
 */
export interface SetOperatingHoursAction {
    type: typeof SET_OPERATING_HOURS;
    operatingHours: string[];
}

export interface SetBusyLevelAction {
    type: typeof SET_BUSY_LEVEL;
    busyLevel: BusyLevel;
}

export interface SetAmenityTagsAction {
    type: typeof SET_AMENITY_TAGS;
    amenityTags: AmenityTag[];
}

/**
 * Action Types
 */
export type CurrentSpaceActions =
    | SetOperatingHoursAction
    | SetBusyLevelAction
    | SetAmenityTagsAction;
