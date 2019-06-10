/**
 * Action Interfaces
 */
export type AttemptLogInAction = (
    userEmail: string,
    userPassword: string,
) => void;

export type LogOutAction = () => void;

export type SignupAction = (
    userEmail: string,
    userName: string,
    userPassword: string,
) => void;
