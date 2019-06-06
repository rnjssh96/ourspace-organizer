import { combineReducers } from 'redux';

import SpaceTreesReducer from './space-trees';
import CurrentSpaceReducer from './current-space';
import SelectedAmenitiesReducer from './selected-amenities';
import SelectedImagesReducer from './upload-images';
import APIProcessReducer from './api-process';

/**
 * Root Reducer
 */
const RootReducer = combineReducers({
    spaceTrees: SpaceTreesReducer,
    currentSpace: CurrentSpaceReducer,
    selectedAmenities: SelectedAmenitiesReducer,
    selectedImages: SelectedImagesReducer,
    apiProcess: APIProcessReducer,
});

export default RootReducer;
