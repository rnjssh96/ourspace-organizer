import { getFromServer } from './request';

import Space from '../model/space';
import SpaceTrees from '../model/space-tree';

import { buildArray2Tree } from '../model/space-tree';

/**
 * Get space trees by organizerUID
 */
export const osdbGetSpaceTrees = async (
    organizerUID: string,
): Promise<SpaceTrees> => {
    await getFromServer({});
    const SAMPLE = [
        {
            id: 'TESTID01',
            pid: 'TESTID11',
            names: {
                en: '1st Floor',
                ko: '1층',
            },
        },
        {
            id: 'TESTID4',
            pid: 'TESTID11',
            names: {
                en: '2nd Floor',
                ko: '2층',
            },
        },
        {
            id: 'TESTID10',
            pid: 'TESTID18',
            names: {
                en: 'Picnic Bench Zone',
                ko: '피크닉벤치존',
            },
        },
        {
            id: 'TESTID11',
            pid: 'TESTID9',
            names: {
                en: 'Hanyang Univ. Main Library',
                ko: '한양대학교 중앙도서관',
            },
        },
        {
            id: 'TESTID18',
            pid: 'TESTID20',
            names: {
                en: 'Outdoor lounge',
                ko: '아웃도어라운지',
            },
        },
        {
            id: 'TESTID20',
            pid: 'TESTID9',
            names: {
                en: 'Google Campus',
                ko: '구글캠퍼스',
            },
        },
    ];
    return [];
};

/**
 * Get space by space
 */
export const osdbGetSpace = async (spaceID: string): Promise<Space> => {
    await getFromServer({});
    return {
        id: '"RgnQ71NWGxlikEOjbIdr"',
        spaceNames: {},
        types: [],
        locationText: '',
        location: {
            lat: 0,
            lng: 0,
        },
        operatingHours: [],
        amenityTags: [],
        spaceIntroduce: '',
        images: [],
        rank: 0,
        busyLevel: '1',
    };
};
