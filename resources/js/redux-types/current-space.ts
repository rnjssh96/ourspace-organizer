import Space, { BusyLevel } from '../model/space';

/**
 * Current Space State
 */
export type CurrentSpaceState = Space;

/**
 * Action Constants
 */
// prettier-ignore
export const SET_BUSY_LEVEL = 'our-space-organizer/home/SET_BUSY_LEVEL';

/**
 * Action Interfaces
 */
export interface SetBusyLevelAction {
    type: typeof SET_BUSY_LEVEL;
    busyLevel: BusyLevel;
}

/**
 * Action Types
 */
export type CurrentSpaceActions = SetBusyLevelAction;
