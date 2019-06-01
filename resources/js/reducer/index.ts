import { combineReducers } from 'redux';

import CurrentSpaceReducer from './space';

/**
 * Root Reducer
 */
const RootReducer = combineReducers({
    currentSpace: CurrentSpaceReducer,
});

export default RootReducer;
