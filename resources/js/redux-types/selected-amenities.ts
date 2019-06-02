import { AmenityTag } from '../model/space';

/**
 * Selected Amenities State
 */
export type SelectedAmenitiesState = { selected: Set<AmenityTag> };

/**
 * Action Constants
 */
// prettier-ignore
export const SET_SELECTED = 'our-space-organizer/selected-amenities/SET_SELECTED';

/**
 * Action Interfaces
 */
export interface SetSelectedAction {
    type: typeof SET_SELECTED;
    selected: Set<AmenityTag>;
}

/**
 * Action Types
 */
export type SelectedAmenitiesActions = SetSelectedAction;
