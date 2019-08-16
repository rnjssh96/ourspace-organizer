import { Locale } from './system.js';
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
    tags: string[];
    purposes: number[];
}

/**
 *
 *
 * Raw data of space from DB
 *
 *
 */
export interface RawSpace {
    [id: string]: {
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
    };
}

/**
 *
 *
 * Interpret ```RawSpaces``` data to a list of ```Space```
 *
 *
 */
export const rawSpaces2SpaceList = (
    spaceID: SpaceID,
    rawSpace: RawSpace,
): Space => {
    let monOH = rawSpace[spaceID].operating_hours.mon.split('\\');
    let tueOH = rawSpace[spaceID].operating_hours.tue.split('\\');
    let wedOH = rawSpace[spaceID].operating_hours.wed.split('\\');
    let thuOH = rawSpace[spaceID].operating_hours.thu.split('\\');
    let friOH = rawSpace[spaceID].operating_hours.fri.split('\\');
    let satOH = rawSpace[spaceID].operating_hours.sat.split('\\');
    let sunOH = rawSpace[spaceID].operating_hours.sun.split('\\');

    return {
        id: spaceID,
        spaceNames: rawSpace[spaceID].space_names,
        spaceType: rawSpace[spaceID].type.toString() as SpaceType,
        spaceDescription: rawSpace[spaceID].description,
        rating: 0,
        images: rawSpace[spaceID].images,
        spaceAddress: rawSpace[spaceID].location_text,
        location: {
            lat: rawSpace[spaceID].latitude,
            lng: rawSpace[spaceID].longitude,
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
        organizers: rawSpace[spaceID].organizers,
        serviceFee: rawSpace[spaceID].cost[0].price == '0' ? 0 : 3,
        spaceDetail: {
            parking: rawSpace[spaceID].property_vector.parking,
            wifi: rawSpace[spaceID].property_vector.wifi,
            plug: rawSpace[spaceID].property_vector.plug,
        },
        tags: rawSpace[spaceID].tags,
        purposes: rawSpace[spaceID].purposes,
    };
};
