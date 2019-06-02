import {
    SetSelectedAction,
    SET_SELECTED,
} from '../redux-types/selected-amenities';

import { AmenityTag } from '../model/space';

/**
 * Action Creators
 */
export const setSelected = (selected: Set<AmenityTag>): SetSelectedAction => ({
    type: SET_SELECTED,
    selected,
});
