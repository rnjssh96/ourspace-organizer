import { Locale } from './system.js';

/**
 * Space ID
 */
export type SpaceID = string;

/**
 * Space names
 */
export type SpaceNames = { [locale in Locale]: string };

/**
 * Busy Level
 */
import { busy_level } from '../config/space.json';

export type BusyLevel = keyof typeof busy_level;

const busyLevels: {
    [level in BusyLevel]: { [locale in Locale]: string }
} = busy_level;

export const interpretBusyLevel = (
    level: BusyLevel,
    locale: Locale = 'en',
): string => {
    return busyLevels[level][locale] || busyLevels[level]['en'];
};

/**
 * Space Type
 */
import { space_type } from '../config/space.json';

export type SpaceType = keyof typeof space_type;

const spaceTypes: {
    [type in SpaceType]: { [locale in Locale]: string }
} = space_type;

export const interpretSpaceType = (
    type: SpaceType,
    locale: Locale = 'en',
): string => {
    return spaceTypes[type][locale] || spaceTypes[type]['en'];
};

/**
 * Amenity
 */
import { amenity } from '../config/space.json';

export type AmenityTag = keyof typeof amenity;

export const amenities: {
    [tag in AmenityTag]: {
        name: { [locale in Locale]: string };
        faicon: string;
    }
} = amenity;

export interface interpretedAmentiy {
    name: string;
    faicon: string;
}

export const interpretAmenity = (
    tag: AmenityTag,
    locale: Locale = 'en',
): interpretedAmentiy => {
    return {
        name: amenities[tag].name[locale] || amenities[tag].name['en'],
        faicon: amenities[tag].faicon,
    };
};

/**
 * LatLng
 */
export interface LatLng {
    lat: number;
    lng: number;
}

/**
 *
 *
 * Full data of space
 *
 *
 */
export interface SpaceGeneralInfo {
    id?: SpaceID;
    spaceNames?: SpaceNames;
    types?: SpaceType[];
    locationText?: string;
    location?: LatLng;
    openingHours?: string[];
}

export default interface Space extends SpaceGeneralInfo {
    id: SpaceID;
    spaceNames: SpaceNames;
    types: SpaceType[];
    locationText: string;
    location: LatLng;
    openingHours: string[];
    amenityTags: AmenityTag[];
    spaceDescription: string;
    images: string[];
    rank: number;
    busyLevel: BusyLevel;
    paid: boolean;
}

/**
 *
 *
 * Raw data of space from DB
 *
 *
 */
export interface RawSpace {
    space_names: SpaceNames;
    images: string[];
    captions: { description: string };
    amenity_tags: { [tag in AmenityTag]: {} };
    longitude: number;
    latitude: number;
    location_text: string;
    opening_hours: string;
    paid: boolean;
    type: number;
    rank: number;
    [key: string]: any; // any additional data
}

/**
 *
 *
 * Interpret ```RawSpaces``` data to a list of ```Space```
 *
 *
 */
export const rawSpaces2SpaceList = (
    sid: SpaceID,
    rawSpace: RawSpace,
): Space => {
    return {
        id: sid,
        spaceNames: rawSpace.space_names,
        types: [rawSpace.type.toString() as SpaceType],
        locationText: rawSpace.location_text,
        location: {
            lat: rawSpace.latitude,
            lng: rawSpace.longitude,
        },
        openingHours: rawSpace.opening_hours.split('\n'),
        amenityTags: Object.keys(rawSpace.amenity_tags) as AmenityTag[],
        spaceDescription: rawSpace.captions.description,
        images: rawSpace.images ? rawSpace.images : [],
        rank: rawSpace.rank,
        busyLevel: '1',
        paid: rawSpace.paid,
    };
};
