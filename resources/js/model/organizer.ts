/**
 * OSUser
 */
export type OrganizerAuthority = 'Organizer' | 'Admin';

interface OSOrganizer {
    uid: string;
    email: string;
    name: string;
    authority: OrganizerAuthority;
}

export default OSOrganizer;
