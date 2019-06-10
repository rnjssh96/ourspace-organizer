/**
 * Action Interfaces
 */
export type FetchSpaceTreesAction = (organizerUID: string) => void;

export type FetchSpaceAction = (spaceID: string, saveHistory?: boolean) => void;

export type UpdateOperatingHourAction = (
    spaceID: string,
    operatingHours: string[],
) => void;
