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
        )
            .then(responseBody => {
                if (responseBody.success) {
                    resolve();
                } else {
                    reject(
                        'OS DEBUG :: Creating organizer info replied FAILED',
                    );
                }
            })
            .catch(error => reject(error));
    });
};

/**
 * Get user info
 */
export const osdbFetchOrganizerInfo = async (
    uid: string,
): Promise<OSOrganizer> => {
    return new Promise((resolve, reject) => {
        getFromServer({ url: `/organizers/${uid}` })
            .then(responseBody => {
                if (
                    responseBody.name &&
                    responseBody.authority &&
                    responseBody.email
                ) {
                    resolve({
                        uid: uid,
                        name: responseBody.name,
                        email: responseBody.email,
                        authority:
                            responseBody.authority === 'admin'
                                ? 'Admin'
                                : 'Organizer',
                    });
                } else {
                    reject(
                        'OS DEBUG :: Fetched organizer info is improperly formatted',
                    );
                }
            })
            .catch(error => reject(error));
    });
};
