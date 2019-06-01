import {
    CurrentSpaceActions,
    SET_BUSY_LEVEL,
    CurrentSpaceState,
} from '../redux-types/current-space';

/**
 * Initial State
 */
const initialState: CurrentSpaceState = {
    spaceNames: {
        ko: '스타벅스 자양점',
        en: 'Starbucks Jayang',
    }, //ok
    types: ['2', '4'], //ok
    locationText: '원주 the potato factory', //ok
    location: {
        lat: 127.0038577,
        long: 37.5035985,
    },
    operatingHours: '00:00 - 24:00 / Mon ~ Sun', //ok
    amenityTags: ['wifi', 'shower', 'bathroom'],
    images: [
        './demo-images/about_img_03.jpg',
        './demo-images/item_image_05b.jpg',
        './demo-images/item_image_06.jpg',
    ], //ok
    rank: 3.5,
    busyLevel: '1', //ok
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
