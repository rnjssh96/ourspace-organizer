import {
    CurrentSpaceActions,
    CurrentSpaceState,
    SET_OPERATING_HOURS,
    SET_BUSY_LEVEL,
    SET_AMENITY_TAGS,
    UPDATE_SPACE_INTRODUCE,
} from '../redux-types/current-space';

/**
 * Initial State
 */
const initialState: CurrentSpaceState = {
    data: {
        id: 'TESTID01',
        spaceNames: {
            ko: '스타벅스 자양점',
            en: 'Starbucks Jayang',
        }, //ok
        types: ['2', '4'], //ok
        locationText: '원주 the potato factory',
        location: {
            lat: -25.344,
            lng: 131.036,
        },
        operatingHours: ['00:00 - 23:59 / 월, 수, 금'], // ok
        amenityTags: ['amazon-pay', 'apple-pay', 'toilet', 'visa', 'wifi'], //ok
        spaceIntroduce: '', //ok
        images: [
            './demo-images/about_img_03.jpg',
            './demo-images/item_image_05b.jpg',
            './demo-images/item_image_06.jpg',
        ], // ok
        rank: 3.5, // ok
        busyLevel: '1', //ok
    },
};

/**
 * CurrentSpaceReducer
 */
export default function CurrentSpaceReducer(
    state = initialState,
    action: CurrentSpaceActions,
): CurrentSpaceState {
    switch (action.type) {
        case UPDATE_SPACE_INTRODUCE:
            return {
                ...state,
                data: {
                    ...state.data,
                    spaceIntroduce: action.spaceIntroduce,
                },
            };

        case SET_OPERATING_HOURS:
            return {
                ...state,
                data: {
                    ...state.data,
                    operatingHours: action.operatingHours,
                },
            };

        case SET_BUSY_LEVEL:
            return {
                ...state,
                data: {
                    ...state.data,
                    busyLevel: action.busyLevel,
                },
            };

        case SET_AMENITY_TAGS:
            return {
                ...state,
                data: {
                    ...state.data,
                    amenityTags: action.amenityTags,
                },
            };

        default:
            return state;
    }
}
