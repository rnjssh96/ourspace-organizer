import * as redux_types from '../redux-types/selected-amenities';

/**
 * Initial State
 */
const initialState: redux_types.State = {
    selectedAmenities: new Set([]),
};

/**
 * SelectedAmenitiesReducer
 */
export default function SelectedAmenitiesReducer(
    state = initialState,
    action: redux_types.Actions,
): redux_types.State {
    switch (action.type) {
        case redux_types.SET_SELECTED_AMENITIES:
            return {
                ...state,
                selectedAmenities: action.selectedAmenities,
            };

        default:
            return state;
    }
}
