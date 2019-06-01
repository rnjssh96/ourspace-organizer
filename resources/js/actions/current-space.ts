import { BusyLevel } from '../model/space';
import {
    SetBusyLevelAction,
    SET_BUSY_LEVEL,
} from '../redux-types/current-space';

/**
 * Action Creators
 */
export const setBusyLevel = (busyLevel: BusyLevel): SetBusyLevelAction => ({
    type: SET_BUSY_LEVEL,
    busyLevel,
});
