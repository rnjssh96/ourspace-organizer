import { ActionCreator } from 'redux';

import {
    SET_SELECTED_AMENITIES,
    SetSelectedAmenityAction,
} from '../redux-types/selected-amenities';

import { AmenityTag } from '../model/space';

/**
 * Action Creators
 */
export const setSelectedAmenities: ActionCreator<SetSelectedAmenityAction> = (
    selectedAmenities: Set<AmenityTag>,
) => ({
    type: SET_SELECTED_AMENITIES,
    selectedAmenities,
});
