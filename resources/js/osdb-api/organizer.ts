import { postToServer, getFromServer } from './request';
import OSOrganizer from '../model/organizer';
import { reject } from 'q';

/**
 * Create user info
 */
export const osdbCreatOrganizerInfo = async (
    uid: string,
    name: string,
    email: string,
): Promise<boolean> => {
    return new Promise(resolve => {
        postToServer(
            { url: '/organizers' },
            {
                uid: uid,
                name: name,
                authority: 'organizer',
                email: email,
            },
        ).then(response => {
            if (response && response.success) {
                resolve();
            }
        });
    });
};

/**
 * Get user info
 */
export const osdbFetchOrganizerInfo = async (uid: string): Promise<OSOrganizer> => {
    return new Promise((resolve, reject) => {
        getFromServer({ url: `/organizers/${uid}` }).then(response => {
            if (response && response.name && response.authority && response.email) {
                resolve({
                    uid: uid,
                    name: response.name,
                    email: response.email,
                    authority:
                        response.authority === 'admin' ? 'Admin' : 'Organizer',
                });
            } else {
                reject();
            }
        });
    });
};
