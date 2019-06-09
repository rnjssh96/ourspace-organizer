import { getFromServer } from './request';

import Space from '../model/space';
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
    return new Promise(async resolve => {
        let spaceIDs: string[] = [];
        // getFromServer({ url: `/organizers/${organizerUID}` }).then(response => {
        //     if (response.owning_spaces) {
        //         spaceIDs = response.owning_spaces;
        //     } else {
        //         reject();
        //     }
        // });
        spaceIDs = [
            '-LeMgOwWhwgCA3zlo_dI',
            '-LeMgOwXUaqHHah8pbOS',
            '-LeMgOwWhwgCA3zlo_c_',
            '-LeMgOwRYl5K7ooz8sQt',
        ];

        let spaceHeaders: RawSpaceHeader[] = [];
        await Promise.all(
            spaceIDs.map(async (sid: string) => {
                let response = await getFromServer({
                    url: `/ospace/${sid}`,
                });
                if (response && response.space_names) {
                    spaceHeaders.push({
                        id: sid,
                        pid: response.parent_space_id,
                        names: response.space_names,
                    });
                }
            }),
        );
        resolve(buildArray2Tree(spaceHeaders));
    });
};

/**
 * Get space by space
 */
export const osdbGetSpace = async (spaceID: string): Promise<Space> => {
    getFromServer({});
    return {};
};
