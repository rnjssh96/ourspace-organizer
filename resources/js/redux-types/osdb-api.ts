/**
 * Action Interfaces
 */
export type AttemptLogInAction = (userEmail: string, userPassword: string) => void;

export type LogOutAction = () => void;

export type FetchSpaceTreesAction = () => void;

export type FetchSpaceAction = () => void;