import { Locale, DataStatus } from './system.js';
import { UserID } from './organizer.js';

/**
 * Space ID
 */
export type SpaceID = string;

/**
 * Space names
 */
export type SpaceNames = { [locale in Locale]: string };

export const interpretRawSpaceName = (
    rawNames: { [locale in Locale]?: string },
): SpaceNames => ({
    en: rawNames.en ? rawNames.en : '',
    ko: rawNames.ko ? rawNames.ko : '',
});

/**
 * Space Type
 */
import { space_type } from '../config/space.json';

export type SpaceType = keyof typeof space_type;

export const spaceTypes: {
    [code in SpaceType]: { [locale in Locale]: string }
} = space_type;

export const interpretSpaceType = (
    type: SpaceType,
    locale: Locale = 'en',
): string => spaceTypes[type][locale];

/**
 * Opening Hours
 */
export type WeekDay = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export const DAYS_IN_WEEK: WeekDay[] = [
    'mon',
    'tue',
    'wed',
    'thu',
    'fri',
    'sat',
    'sun',
];

interface OpeningHour {
    open: string;
    close?: string;
}

export type OpeningHours = { [day in WeekDay]: OpeningHour };

/**
 * LatLng
 */
export interface LatLng {
    lat: number;
    lng: number;
}

/**
 * Image
 */
export interface SpaceImage {
    low: string;
    mid: string;
    high: string;
    owner: string;
}

/**
 * Space Tag
 */
import { space_tag } from '../config/space.json';

export type SpaceTag = keyof typeof space_tag;

export const spaceTags: {
    [code in SpaceTag]: { [locale in Locale]: string }
} = space_tag;

export const interpretSpaceTag = (
    tag: SpaceTag,
    locale: Locale = 'en',
): string => spaceTags[tag][locale];

/**
 * Purpose
 */
import { purpose } from '../config/space.json';

export type Purpose = keyof typeof purpose;

export const purposes: {
    [code in Purpose]: { [locale in Locale]: string }
} = purpose;

export const interpretPurpose = (
    purpose: Purpose,
    locale: Locale = 'en',
): string => purposes[purpose][locale];

/**
 *
 *
 * Full data of space
 *
 *
 */
export default interface Space {
    id: SpaceID;
    spaceNames: SpaceNames;
    spaceType: SpaceType;
    spaceDescription: string;
    rating: number;
    images: SpaceImage[];
    spaceAddress: string;
    location: LatLng;
    openingHours: OpeningHours;
    organizers: UserID[];
    serviceFee: 0 | 3;
    spaceDetail: {
        parking: number;
        wifi: number;
        plug: number;
    };
    tags: SpaceTag[];
    purposes: Purpose[];
}

/**
 *
 *
 * Raw data of space from DB
 *
 *
 */
export interface RawSpace {
    space_names: {
        en?: string;
        ko?: string;
    };
    description: string;
    images: SpaceImage[];
    location_text: string;
    latitude: number;
    longitude: number;
    likes: UserID[];
    operating_hours: { [day in WeekDay]: string };
    organizers: UserID[];
    tags: string[];
    cost: {
        type: string;
        price: string;
    }[];
    type: number;
    property_vector: {
        parking: number;
        wifi: number;
        plug: number;
    };
    purposes: number[];
    // not used
    image_owners: any;
    metadata: any;
    operating_notes: any;
    special_notes: any;
    rating: number;
}

export interface RawSpaceWithID {
    [id: string]: RawSpace;
}

/**
 *
 *
 * Decode ```RawSpaces``` data to a list of ```Space```
 *
 *
 */
export const rawSpaces2SpaceList = (
    spaceID: SpaceID,
    rawSpace: RawSpace,
): Space => {
    let monOH = rawSpace.operating_hours.mon.split('\\');
    let tueOH = rawSpace.operating_hours.tue.split('\\');
    let wedOH = rawSpace.operating_hours.wed.split('\\');
    let thuOH = rawSpace.operating_hours.thu.split('\\');
    let friOH = rawSpace.operating_hours.fri.split('\\');
    let satOH = rawSpace.operating_hours.sat.split('\\');
    let sunOH = rawSpace.operating_hours.sun.split('\\');

    return {
        id: spaceID,
        spaceNames: interpretRawSpaceName(rawSpace.space_names),
        spaceType: rawSpace.type.toString() as SpaceType,
        spaceDescription: rawSpace.description,
        rating: rawSpace.rating,
        images: rawSpace.images,
        spaceAddress: rawSpace.location_text,
        location: {
            lat: rawSpace.latitude,
            lng: rawSpace.longitude,
        },
        openingHours: {
            mon: { open: monOH[0], close: monOH[1] },
            tue: { open: tueOH[0], close: tueOH[1] },
            wed: { open: wedOH[0], close: wedOH[1] },
            thu: { open: thuOH[0], close: thuOH[1] },
            fri: { open: friOH[0], close: friOH[1] },
            sat: { open: satOH[0], close: satOH[1] },
            sun: { open: sunOH[0], close: sunOH[1] },
        },
        organizers: rawSpace.organizers,
        serviceFee: rawSpace.cost[0].price == '0' ? 0 : 3,
        spaceDetail: {
            parking: rawSpace.property_vector.parking,
            wifi: rawSpace.property_vector.wifi,
            plug: rawSpace.property_vector.plug,
        },
        tags: rawSpace.tags as SpaceTag[],
        purposes: rawSpace.purposes.map(
            purpose => purpose.toString() as Purpose,
        ),
    };
};

/**
 *
 *
 * Space data set possible status
 *
 *
 */
export type SpaceRequestUnit =
    | 'all'
    | 'title'
    | 'description'
    | 'operating-hours'
    | 'purpose'
    | 'tags'
    | 'location';

export interface SpaceDataStatus extends DataStatus {
    requestUnit?: SpaceRequestUnit;
}

/**
 *
 *
 * Data of space for post update
 *
 *
 */
export interface SpaceUpdate {
    // title
    spaceNames?: SpaceNames;
    spaceType?: SpaceType;

    // description
    description?: string;

    // operating-hours
    operating_hours?: { [day in WeekDay]: string };

    // purpose
    purpose?: number[];

    // tags
    tags?: string[];

    // location
    location_text?: string;
    latitude?: number;
    longitude?: number;
}

export const encodeSpaceUpdate = (spaceUpdate: SpaceUpdate) => {
    let encoded: { [key: string]: any } = {};
    spaceUpdate.spaceNames && (encoded['space_names'] = spaceUpdate.spaceNames);
    spaceUpdate.spaceType &&
        (encoded['type'] = parseInt(spaceUpdate.spaceType));
    spaceUpdate.description !== null &&
        (encoded['description'] = spaceUpdate.description);
    spaceUpdate.operating_hours !== null &&
        (encoded['operating_hours'] = spaceUpdate.operating_hours);
    spaceUpdate.purpose && (encoded['purposes'] = spaceUpdate.purpose);
    spaceUpdate.tags && (encoded['tags'] = spaceUpdate.tags);
    spaceUpdate.location_text !== null &&
        (encoded['location_text'] = spaceUpdate.location_text);
    spaceUpdate.latitude !== null &&
        (encoded['latitude'] = spaceUpdate.latitude);
    spaceUpdate.longitude !== null &&
        (encoded['longitude'] = spaceUpdate.longitude);
    return encoded;
};
