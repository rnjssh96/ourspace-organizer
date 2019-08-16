import { SpaceNames } from './space';

/**
 *
 *
 * Space Header
 *
 *
 */
export interface SpaceHeader {
    id: string;
    spaceNames: SpaceNames;
}

/**
 *
 *
 * Raw space header map
 *
 *
 */
export interface RawSpaceHeaderMap {
    [id: string]: {
        space_names: SpaceNames;
        location_text: string;
    };
}

export const rawSpaceHeaderMap2SpaceHeaderList = (
    spaceMap: RawSpaceHeaderMap,
): SpaceHeader[] =>
    Object.keys(spaceMap).map((uid: string) => ({
        id: uid,
        spaceNames: spaceMap[uid].space_names,
    }));
