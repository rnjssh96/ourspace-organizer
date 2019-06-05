import {
    SelectedAmenitiesState,
    SelectedAmenitiesActions,
    SET_SELECTED_AMENITIES,
} from '../redux-types/selected-amenities';

/**
 * Initial State
 */
const initialState: SelectedAmenitiesState = {
    selectedAmenities: new Set(['shower']),
};

/**
 * SelectedAmenitiesReducer
 */
export default function SelectedAmenitiesReducer(
    state = initialState,
    action: SelectedAmenitiesActions,
): SelectedAmenitiesState {
    switch (action.type) {
        case SET_SELECTED_AMENITIES:
            return {
                ...state,
                selectedAmenities: action.selectedAmenities,
            };

        default:
            return state;
    }
}
