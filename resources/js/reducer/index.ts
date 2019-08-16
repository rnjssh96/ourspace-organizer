import { combineReducers } from 'redux';

import AuthReducer from './auth';
import SpaceListReducer from './space-list';
import SpaceSearchReducer from './space-search';
import SpaceHistoryReducer from './space-history';
import CurrentSpaceReducer from './current-space';
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
    selectedImages: SelectedImagesReducer,
});

export default RootReducer;
