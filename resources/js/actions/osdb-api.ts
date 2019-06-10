import { ActionCreator, Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import Space from '../model/space';
import SpaceTrees from '../model/space-tree';

import {
    osdbGetSpace,
    osdbGetSpaceTrees,
    osdbUpdateOperatingHour,
} from '../osdb-api/space';

import {
    requestSpaceTrees,
    receiveSpaceTrees,
    endRequestSpaceTrees,
} from './space-trees';
import {
    requestSpace,
    receiveSpace,
    endRequestSpace,
    startUpdateOH,
    finishUpdateOH,
    endUpdateOH,
} from './current-space';
import { pushIntoSpaceHistory } from './space-history';

/**
 * Fetch space trees from OSDB
 */
export const fetchSpaceTrees: ActionCreator<
    ThunkAction<void, SpaceTrees, null, Action<any>>
> = (organizerUID: string) => async (
    dispatch: ThunkDispatch<SpaceTrees, null, Action<any>>,
) => {
    dispatch(requestSpaceTrees());
    osdbGetSpaceTrees(organizerUID)
        .then((spaceTrees: SpaceTrees) => {
            dispatch(receiveSpaceTrees(spaceTrees));
        })
        .catch(() => dispatch(endRequestSpaceTrees()));
};

/**
 * Fetch space from OSDB
 */
export const fetchSpace: ActionCreator<
    ThunkAction<void, Space, null, Action<any>>
> = (spaceID: string, saveHistory: boolean = false) => async (
    dispatch: ThunkDispatch<Space, null, Action<any>>,
) => {
    dispatch(requestSpace());
    osdbGetSpace(spaceID)
        .then((space: Space) => {
            dispatch(receiveSpace(space));
            if (saveHistory) {
                dispatch(
                    pushIntoSpaceHistory({
                        id: spaceID,
                        names: space.spaceNames,
                    }),
                );
            }
        })
        .catch(() => dispatch(endRequestSpace()));
};

/**
 * Fetch space from OSDB
 */
export const updateOperatingHour: ActionCreator<
    ThunkAction<void, string[], null, Action<any>>
> = (spaceID: string, operatingHours: string[]) => async (
    dispatch: ThunkDispatch<string[], null, Action<any>>,
) => {
    dispatch(startUpdateOH());
    osdbUpdateOperatingHour(spaceID, operatingHours)
        .then(() => {
            dispatch(finishUpdateOH(operatingHours));
        })
        .catch(() => dispatch(endUpdateOH()));
};
