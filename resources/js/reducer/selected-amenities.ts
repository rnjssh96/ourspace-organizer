import {
    SelectedAmenitiesState,
    SelectedAmenitiesActions,
    SET_SELECTED,
} from '../redux-types/selected-amenities';

/**
 * Initial State
 */
const initialState: SelectedAmenitiesState = { selected: new Set(['shower']) };

/**
 * SelectedAmenitiesReducer
 */
export default function SelectedAmenitiesReducer(
    state = initialState,
    action: SelectedAmenitiesActions,
) {
    switch (action.type) {
        case SET_SELECTED:
            return {
                ...state,
                selected: action.selected,
            };

        default:
            return state;
    }
}
