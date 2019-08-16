import { SpaceID } from './space';

/**
 * User ID
 */
export type UserID = string;

/**
 * Organizer auth types
 */
export type OrganizerAuthority = 'organizer' | 'admin';

/**
 *
 *
 * Full data of organizer
 *
 *
 */
export default interface Organizer {
    uid: UserID;
    name: string;
    email: string;
    owningSpaces: SpaceID[];
    authority: OrganizerAuthority;
}

/**
 *
 *
 * Raw data of organizer from DB
 *
 *
 */
export interface RawOrganizer {
    name: string;
    email: string;
    authority: OrganizerAuthority;
    owning_spaces: string[];
    approved: boolean;
}

/**
 *
 *
 * Interpret ```RawOrganizer``` data to a list of ```Organizer```
 *
 *
 */
export const rawOrganizer2Organizer = (
    uid: string,
    rawOrganizer: RawOrganizer,
): Organizer => {
    return {
        uid: uid,
        name: rawOrganizer.name,
        email: rawOrganizer.email,
        authority: rawOrganizer.authority,
        owningSpaces: rawOrganizer.owning_spaces as SpaceID[],
    };
};
