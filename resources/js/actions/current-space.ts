import { BusyLevel, AmenityTag } from '../model/space';
import {
    SET_OPERATING_HOURS,
    SetOperatingHoursAction,
    SET_BUSY_LEVEL,
    SetBusyLevelAction,
    SetAmenityTagsAction,
    SET_AMENITY_TAGS,
    UpdateSpaceIntroduceAction,
    UPDATE_SPACE_INTRODUCE,
} from '../redux-types/current-space';

/**
 * Action Creators
 */
export const updateSpaceIntroduce = (
    spaceIntroduce: string,
): UpdateSpaceIntroduceAction => ({
    type: UPDATE_SPACE_INTRODUCE,
    spaceIntroduce,
});

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
