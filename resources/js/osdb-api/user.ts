import { postToServer } from './request';

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
