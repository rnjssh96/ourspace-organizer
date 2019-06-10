import {
    SpaceTreesState,
    SpaceTreesActions,
    REQUEST_SPACE_TREES,
    RECEIVE_SPACE_TREES,
    END_REQUEST_SPACE_TREES,
    RESET_SPACE_TREES,
} from '../redux-types/space-trees';

/**
 * Initial State
 */
const initialState: SpaceTreesState = {
    data: [],
    status: {
        requestingSpaceTrees: false,
    },
};

/**
 * SpaceTreesReducer
 */
export default function SpaceTreesReducer(
    state = initialState,
    action: SpaceTreesActions,
): SpaceTreesState {
    switch (action.type) {
        case REQUEST_SPACE_TREES:
            return {
                ...state,
                status: {
                    ...state.status,
                    requestingSpaceTrees: true,
                },
            };

        case RECEIVE_SPACE_TREES:
            return {
                ...state,
                data: action.spaceTrees,
                status: {
                    ...state.status,
                    requestingSpaceTrees: false,
                },
            };

        case END_REQUEST_SPACE_TREES:
            return {
                ...state,
                status: {
                    ...state.status,
                    requestingSpaceTrees: false,
                },
            };

        case RESET_SPACE_TREES:
            return {
                data: [],
                status: {
                    requestingSpaceTrees: false,
                },
            };

        default:
            return state;
    }
}
