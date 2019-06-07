import { getFromServer } from './request';
import { LoggedStatus } from '../redux-types/auth';

/**
 * Get space trees by organizerUID
 */
export const osdbAttemptLogIn = async (
    userEmail: string,
    password: string,
): Promise<LoggedStatus> => {
    await getFromServer({});
    return 'success';
};
