import { BusyLevel, AmenityTag } from '../model/space';
import {
    SET_OPERATING_HOURS,
    SetOperatingHoursAction,
    SET_BUSY_LEVEL,
    SetBusyLevelAction,
    SetAmenityTagsAction,
    SET_AMENITY_TAGS,
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

export const setAmenityTags = (
    amenityTags: AmenityTag[],
): SetAmenityTagsAction => ({
    type: SET_AMENITY_TAGS,
    amenityTags,
});
