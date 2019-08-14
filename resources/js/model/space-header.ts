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
    names: SpaceNames;
}

/**
 *
 *
 * Raw space header
 *
 *
 */
export interface RawSpaceHeader {
    id: string;
    names: SpaceNames;
}
