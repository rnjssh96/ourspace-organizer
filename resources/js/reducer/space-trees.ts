import {
    SpaceTreesState,
    SpaceTreesActions,
    SET_SPACE_TREES,
} from '../redux-types/space-trees';

import { buildArray2Tree } from '../model/space-tree';

const SAMPLE = [
    {
        id: 'TESTID01',
        pid: 'TESTID11',
        names: {
            en: '1st Floor',
            ko: '1층',
        },
    },
    // { id: '2', pid: '15', names: { en: 'test' } },
    // { id: '3', pid: '2', names: { en: 'test' } },
    {
        id: 'TESTID4',
        pid: 'TESTID11',
        names: {
            en: '2nd Floor',
            ko: '2층',
        },
    },
    // { id: '5', pid: '2', names: { en: 'test' } },
    // { id: '6', pid: '2', names: { en: 'test' } },
    // { id: '7', pid: '21', names: { en: 'test' } },
    // { id: '8', pid: '12', names: { en: 'test' } },
    // { id: '9', pid: 'root', names: { en: 'test' } },
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
    // { id: '12', pid: '16', names: { en: 'test' } },
    // { id: '13', pid: '7', names: { en: 'test' } },
    // { id: '14', pid: '7', names: { en: 'test' } },
    // { id: '15', pid: 'root', names: { en: 'test' } },
    // { id: '16', pid: '7', names: { en: 'test' } },
    // { id: '17', pid: '16', names: { en: 'test' } },
    {
        id: 'TESTID18',
        pid: 'TESTID20',
        names: {
            en: 'Outdoor lounge',
            ko: '아웃도어라운지',
        },
    },
    // { id: '19', pid: '9', names: { en: 'test' } },
    {
        id: 'TESTID20',
        pid: 'TESTID9',
        names: {
            en: 'Google Campus',
            ko: '구글캠퍼스',
        },
    },
];

/**
 * Initial State
 */
const initialState: SpaceTreesState = buildArray2Tree(SAMPLE);

/**
 * SpaceTreesReducer
 */
export default function SpaceTreesReducer(
    state = initialState,
    action: SpaceTreesActions,
): SpaceTreesState {
    switch (action.type) {
        case SET_SPACE_TREES:
            return action.spaceTrees;

        default:
            return state;
    }
}
