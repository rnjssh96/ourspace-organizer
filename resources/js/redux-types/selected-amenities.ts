import { Action } from 'redux';

import { AmenityTag } from '../model/space';

/**
 * Selected Amenities State
 */
export type SelectedAmenitiesState = {
    selectedAmenities: Set<AmenityTag>;
};

/**
 * Action Constants
 */
// prettier-ignore
export const SET_SELECTED_AMENITIES = 'selected-amenities/SET_SELECTED_AMENITIES';

/**
 * Action Interfaces
 */
export interface SetSelectedAmenityAction
    extends Action<typeof SET_SELECTED_AMENITIES> {
    selectedAmenities: Set<AmenityTag>;
}

/**
 * Action Types
 */
export type SelectedAmenitiesActions = SetSelectedAmenityAction;
