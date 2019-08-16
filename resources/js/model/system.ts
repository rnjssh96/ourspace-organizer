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
 * Data set possible status
 */
export interface DataStatus {
    status: 'ready' | 'processing' | 'failed';
    message?: string;
}

/**
 * Space data set possible status
 */
export interface SpaceDataStatus extends DataStatus {
    processingUnit?: 'all' | 'description';
}
