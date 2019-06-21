import { ActionCreator } from 'redux';

import * as redux_types from '../redux-types/selected-amenities';

import { AmenityTag } from '../model/space';

/**
 * Action Creators
 */
export const setSelectedAmenities: ActionCreator<
    redux_types.SetSelectedAmenityAction
> = (selectedAmenities: Set<AmenityTag>) => ({
    type: redux_types.SET_SELECTED_AMENITIES,
    selectedAmenities,
});
