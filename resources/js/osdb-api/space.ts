import { getFromServer, postToServer } from './request';

import Space, { AmenityTag } from '../model/space';
import SpaceTrees, {
    RawSpaceHeader,
    buildArray2Tree,
} from '../model/space-tree';

/**
 * Get space trees by organizerUID
 */
export const osdbGetSpaceTrees = async (
    organizerUID: string,
): Promise<SpaceTrees> => {
    return new Promise(async (resolve, reject) => {
        let spaceIDs: string[] = [];
        let spaceHeaders: RawSpaceHeader[] = [];
        await getFromServer({ url: `/organizers/${organizerUID}` })
            .then(response => {
                if (response.owning_spaces) {
                    spaceIDs = response.owning_spaces;
                } else {
                    reject('OS DEBUG :: Could not fetch owning spaces list');
                }
            })
            .catch(error => reject(error));
        await Promise.all(
            spaceIDs.map(async (sid: string) => {
                await getFromServer({
                    url: `/ospace/${sid}`,
                }).then(responseBody => {
                    if (responseBody.space_names) {
                        spaceHeaders.push({
                            id: sid,
                            pid: responseBody.parent_space_id,
                            names: responseBody.space_names,
                        });
                    }
                });
            }),
        );
        resolve(buildArray2Tree(spaceHeaders));
    });
};

/**
 * Get space by space
 */
export const osdbGetSpace = async (spaceID: string): Promise<Space> => {
    return new Promise((resolve, reject) => {
        getFromServer({ url: `/ospace/${spaceID}` })
            .then(responseBody => {
                resolve({
                    id: spaceID,
                    spaceNames: responseBody.space_names,
                    types: [responseBody.type],
                    locationText: responseBody.location_text,
                    location: {
                        lat: responseBody.latitude,
                        lng: responseBody.longitude,
                    },
                    operatingHours:
                        responseBody.operating_hours === ''
                            ? []
                            : responseBody.operating_hours.split('\n'),
                    amenityTags: Object.keys(
                        responseBody.amenity_tags,
                    ) as AmenityTag[],
                    spaceIntroduce: '',
                    images: responseBody.images,
                    rank: responseBody.rank,
                    busyLevel: '1',
                });
            })
            .catch(error => reject(error));
    });
};

/**
 * Update space operating hour
 */
export const osdbUpdateOperatingHour = async (
    spaceID: string,
    operatingHours: string[],
): Promise<void> => {
    return new Promise((resolve, reject) => {
        postToServer(
            { url: `/ospace/${spaceID}` },
            {
                operating_hours: operatingHours.join('\n'),
            },
        )
            .then(() => {
                resolve();
            })
            .catch(error => reject(error));
    });
};
