import { combineReducers } from 'redux';

import AuthReducer from './auth';
import SpaceListReducer from './space-list';
import SpaceSearchReducer from './space-search';
import SpaceHistoryReducer from './space-history';
import CurrentSpaceReducer from './current-space';
import SelectedAmenitiesReducer from './selected-amenities';
import SelectedImagesReducer from './upload-images';

/**
 * Root Reducer
 */
const RootReducer = combineReducers({
    auth: AuthReducer,
    spaceList: SpaceListReducer,
    spaceSearch: SpaceSearchReducer,
    spaceHistory: SpaceHistoryReducer,
    currentSpace: CurrentSpaceReducer,
    selectedAmenities: SelectedAmenitiesReducer,
    selectedImages: SelectedImagesReducer,
});

export default RootReducer;
