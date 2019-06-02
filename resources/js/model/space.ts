import SpaceInterpret from './space-interpret.json';

export interface SpaceNames {
    [lan: string]: string;
}

/**
 * Busy Level
 */
export type BusyLevel = keyof typeof SpaceInterpret['busy-level'];

const busyLevels: { [level in BusyLevel]: { [lan: string]: string } } =
    SpaceInterpret['busy-level'];

export const interpretBusyLevel = (
    level: BusyLevel,
    locale: string = 'en',
): string => {
    return busyLevels[level][locale] || busyLevels[level]['en'];
};

/**
 * Space Type
 */
export type SpaceType = keyof typeof SpaceInterpret['type'];

const spaceTypes: { [type in SpaceType]: { [lan: string]: string } } =
    SpaceInterpret['type'];

export const interpretSpaceType = (
    type: SpaceType,
    locale: string = 'en',
): string => {
    return spaceTypes[type][locale] || spaceTypes[type]['en'];
};

/**
 * Amenity
 */
export type AmenityTag = keyof typeof SpaceInterpret['amenity'];

export const amenities: {
    [tag in AmenityTag]: { name: { [lan: string]: string }; faicon: string }
} = SpaceInterpret['amenity'];

export interface interpretedAmentiy {
    name: string;
    faicon: string;
}

export const interpretAmenity = (
    tag: AmenityTag,
    locale: string = 'en',
): interpretedAmentiy => {
    return {
        name: amenities[tag].name[locale] || amenities[tag].name['en'],
        faicon: amenities[tag].faicon,
    };
};

/**
 * Space
 */
interface Space {
    spaceNames: SpaceNames;
    types: SpaceType[];
    locationText: string;
    location: {
        lat: number;
        long: number;
    };
    operatingHours: string[];
    amenityTags: AmenityTag[];
    images: string[];
    rank: number;
    busyLevel: BusyLevel;
}

export default Space;
