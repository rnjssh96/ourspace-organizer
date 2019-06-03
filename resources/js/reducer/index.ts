import { combineReducers } from 'redux';

import CurrentSpaceReducer from './current-space';
import SelectedAmenitiesReducer from './selected-amenities';
import SelectedImagesReducer from './upload-images';

/**
 * Root Reducer
 */
const RootReducer = combineReducers({
    currentSpace: CurrentSpaceReducer,
    selectedAmenities: SelectedAmenitiesReducer,
    selectedImages: SelectedImagesReducer,
});

export default RootReducer;
