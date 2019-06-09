/**
 * Action Interfaces
 */
export type FetchSpaceTreesAction = (organizerUID: string) => void;

export type FetchSpaceAction = (spaceID: string) => void;

export type UpdateOperatingHourAction = (
    spaceID: string,
    operatingHours: string[],
) => void;
