import { getFromServer } from './request';

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
                }).then(response => {
                    if (response.space_names) {
                        spaceHeaders.push({
                            id: sid,
                            pid: response.parent_space_id,
                            names: response.space_names,
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
            .then(response => {
                resolve({
                    id: spaceID,
                    spaceNames: response.space_names,
                    types: [response.type],
                    locationText: response.location_text,
                    location: {
                        lat: response.latitude,
                        lng: response.longitude,
                    },
                    operatingHours: response.operating_hours,
                    amenityTags: Object.keys(
                        response.amenity_tags,
                    ) as AmenityTag[],
                    spaceIntroduce: '',
                    images: response.images,
                    rank: response.rank,
                    busyLevel: '1',
                });
            })
            .catch(error => reject(error));
    });
};
