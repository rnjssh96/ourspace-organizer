import {
    CurrentSpaceActions,
    SET_BUSY_LEVEL,
    CurrentSpaceState,
} from '../redux-types/current-space';

/**
 * Initial State
 */
const initialState: CurrentSpaceState = {
    spaceNames: [
        { lang: 'ko', localizedName: '스타벅스 자양점' },
        { lang: 'ko', localizedName: '스타벅스 자양점' },
    ],
    type: [2, 4],
    locationText: '원주 the potato factory',
    location: {
        lat: 127.0038577,
        long: 37.5035985,
    },
    operatingHours: '00:00 - 24:00 / Mon ~ Sun',
    amenityTags: ['wifi', 'shower', 'bathroom'],
    images: ['link_to_image', 'another_link_to_image'],
    rank: 3.5,
    busyLevel: 'free',
};

/**
 * CurrentSpaceReducer
 */
export default function CurrentSpaceReducer(
    state = initialState,
    action: CurrentSpaceActions,
) {
    switch (action.type) {
        case SET_BUSY_LEVEL:
            return {
                ...state,
                busyLevel: action.busyLevel,
            };

        default:
            return state;
    }
}
