import { BusyLevel } from '../model/space';
import {
    SET_OPERATING_HOURS,
    SetOperatingHoursAction,
    SET_BUSY_LEVEL,
    SetBusyLevelAction,
} from '../redux-types/current-space';

/**
 * Action Creators
 */
export const setOperatingHours = (
    operatingHours: string[],
): SetOperatingHoursAction => ({
    type: SET_OPERATING_HOURS,
    operatingHours,
});

export const setBusyLevel = (busyLevel: BusyLevel): SetBusyLevelAction => ({
    type: SET_BUSY_LEVEL,
    busyLevel,
});
