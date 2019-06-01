import Space, { BusyLevel } from '../model/space';

/**
 * Current Space State
 */
export type CurrentSpaceState = Space;

/**
 * Action Constants
 */
// prettier-ignore
export const SET_OPERATING_HOURS = 'our-space-organizer/home/SET_OPERATING_HOURS';
// prettier-ignore
export const SET_BUSY_LEVEL = 'our-space-organizer/home/SET_BUSY_LEVEL';

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

/**
 * Action Types
 */
export type CurrentSpaceActions = SetOperatingHoursAction | SetBusyLevelAction;
