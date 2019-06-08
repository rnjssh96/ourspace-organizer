/**
 * OSUser
 */
export type UserAuthority = 'Organizer' | 'Admin';

interface OSUser {
    uid: string;
    email: string;
    name: string;
    authority: UserAuthority;
}

export default OSUser;
