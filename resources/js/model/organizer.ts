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
    email: string;
    name: string;
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
    uid: string;
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
    rawOrganizer: RawOrganizer,
): Organizer => {
    return {
        uid: rawOrganizer.uid,
        email: rawOrganizer.email,
        name: rawOrganizer.name,
        owningSpaces: rawOrganizer.owning_spaces as SpaceID[],
        authority: rawOrganizer.authority,
    };
};
