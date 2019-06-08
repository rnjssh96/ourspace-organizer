import { postToServer, getFromServer } from './request';
import OSUser from '../model/user';

/**
 * Create user info
 */
export const osdbCreatUserInfo = async (
    UID: string,
    name: string,
    email: string,
): Promise<void> => {
    return new Promise(resolve => {
        postToServer(
            { url: '/users' },
            {
                uid: UID,
                user_data: {
                    name: name,
                    authority: 'space organizer',
                    email: email,
                },
            },
        ).then(response => {
            if (response.success) {
                resolve();
            }
        });
    });
};

/**
 * Get user info
 */
export const osdbFetchUserInfo = async (UID: string): Promise<OSUser> => {
    return new Promise(resolve => {
        getFromServer({ url: `/users/${UID}` }).then(response => {
            if (response.name && response.authority && response.email) {
                resolve({
                    uid: UID,
                    name: response.name,
                    email: response.email,
                    authority:
                        response.authority === 'admin' ? 'Admin' : 'Organizer',
                });
            }
        });
    });
};
