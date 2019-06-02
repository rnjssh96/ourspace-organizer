import { combineReducers } from 'redux';

import CurrentSpaceReducer from './space';
import SelectedAmenitiesReducer from './selected-amenities';

/**
 * Root Reducer
 */
const RootReducer = combineReducers({
    currentSpace: CurrentSpaceReducer,
    selectedAmenities: SelectedAmenitiesReducer,
});

export default RootReducer;
