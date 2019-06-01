import * as SpaceInterpret from './space-interpret.json';

export interface SpaceNames {
    [lan: string]: string;
}

export type BusyLevel = keyof typeof SpaceInterpret['busy-level'];

export type SpaceType = keyof typeof SpaceInterpret['type'];

export const interpretBusyLevel = (level: BusyLevel, locale: string = 'en') => {
    const busyLevels: { [key in BusyLevel]: { [key: string]: string } } =
        SpaceInterpret['busy-level'];

    return busyLevels[level][locale] || busyLevels[level]['en'];
};

export const interpretSpaceType = (type: SpaceType, locale: string = 'en') => {
    const spaceTypes: { [key in SpaceType]: { [key: string]: string } } =
        SpaceInterpret['type'];

    return spaceTypes[type][locale] || spaceTypes[type]['en'];
};

interface Space {
    spaceNames: SpaceNames;
    types: SpaceType[];
    locationText: string;
    location: {
        lat: number;
        long: number;
    };
    operatingHours: string[];
    amenityTags: string[];
    images: string[];
    rank: number;
    busyLevel: BusyLevel;
}

export default Space;
