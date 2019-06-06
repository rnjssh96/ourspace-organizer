import { ActionCreator } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import {
    SET_SPACE_FETCHING,
    SetSpaceFetchingAction,
} from '../redux-types/api-process';

export const setSpaceFetching: ActionCreator<SetSpaceFetchingAction> = (
    spaceFetching: boolean,
) => ({
    type: SET_SPACE_FETCHING,
    spaceFetching,
});

export const fetchSpaceFromServer: ActionCreator<
    ThunkAction<
        Promise<SetSpaceFetchingAction>,
        boolean,
        null,
        SetSpaceFetchingAction
    >
> = () => async (
    dispatch: ThunkDispatch<boolean, null, SetSpaceFetchingAction>,
) => {
    dispatch(setSpaceFetching(true));
    async function resolveAfter2Seconds() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, 4000);
        });
    }
    await resolveAfter2Seconds();
    return dispatch(setSpaceFetching(false));
};