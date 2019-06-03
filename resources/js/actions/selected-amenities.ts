import {
    SetSelectedAmenityAction,
    SET_SELECTED_AMENITIES,
} from '../redux-types/selected-amenities';

import { AmenityTag } from '../model/space';

/**
 * Action Creators
 */
export const setSelectedAmenities = (
    selectedAmenities: Set<AmenityTag>,
): SetSelectedAmenityAction => ({
    type: SET_SELECTED_AMENITIES,
    selectedAmenities,
});
