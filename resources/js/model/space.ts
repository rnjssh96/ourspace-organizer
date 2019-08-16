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
type DAYS_IN_WEEK = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export type OpeningHours = { [day in DAYS_IN_WEEK]: OpeningHour };

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
 * Day Opening Hour
 */
export interface OpeningHour {
    open: string;
    close: string;
}

/**
 * Space Tag
 */
import { space_tag } from '../config/space.json';

export type SpaceTag = keyof typeof space_tag;

const spaceTags: {
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

const purposes: { [code in Purpose]: { [locale in Locale]: string } } = purpose;

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
    space_names: SpaceNames;
    description: string;
    images: SpaceImage[];
    location_text: string;
    latitude: number;
    longitude: number;
    likes: UserID[];
    operating_hours: { [day in DAYS_IN_WEEK]: string };
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
        spaceNames: rawSpace.space_names,
        spaceType: rawSpace.type.toString() as SpaceType,
        spaceDescription: rawSpace.description,
        rating: 0,
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
export type SpaceRequestUnit = 'all' | 'title' | 'description';

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
    spaceNames?: SpaceNames;
    spaceType?: SpaceType;
}

export const encodeSpaceUpdate = (spaceUpdate: SpaceUpdate) => {
    let encoded: { [key: string]: any } = {};
    spaceUpdate.spaceNames && (encoded['space_names'] = spaceUpdate.spaceNames);
    spaceUpdate.spaceType &&
        (encoded['type'] = parseInt(spaceUpdate.spaceType));
    return encoded;
};
