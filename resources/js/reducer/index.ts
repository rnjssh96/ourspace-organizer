import { combineReducers } from 'redux';

import AuthReducer from './auth';
import SpaceTreesReducer from './space-trees';
import CurrentSpaceReducer from './current-space';
import SelectedAmenitiesReducer from './selected-amenities';
import SelectedImagesReducer from './upload-images';

/**
 * Root Reducer
 */
const RootReducer = combineReducers({
    auth: AuthReducer,
    spaceTrees: SpaceTreesReducer,
    currentSpace: CurrentSpaceReducer,
    selectedAmenities: SelectedAmenitiesReducer,
    selectedImages: SelectedImagesReducer,
});

export default RootReducer;
