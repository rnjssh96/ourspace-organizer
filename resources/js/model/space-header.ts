import { SpaceNames } from './space';

export interface RawSpaceHeader {
    id: string;
    pid: string;
    names: SpaceNames;
}

/**
 * Space Header
 */
export interface SpaceHeader {
    id: string;
    names: SpaceNames;
}
