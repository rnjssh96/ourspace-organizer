/**
 * Supported locale
 */
export type Locale = 'en' | 'ko';

/**
 * Login possible status
 */
export interface LoginStatus {
    status: 'ready' | 'processing' | 'succeed' | 'failed';
    message?: string;
}

/**
 * Signup possible status
 */
export interface SignupStatus {
    status: 'ready' | 'processing' | 'succeed' | 'failed';
    message?: string;
}

/**
 * API request possible status
 */
export interface RequestStatus {
    status: 'ready' | 'requesting' | 'succeed' | 'failed';
    message?: string;
}
