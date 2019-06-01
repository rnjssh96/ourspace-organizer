// interface Space {
//     spaceNames: { lang: string; localizedName: string }[];
//     accessibilityCaptions: string;
//     amenityTags: string[];
//     captions: { origin: string; caption: string }[];
//     imageOwner: string;
//     images: string[];
//     location: {
//         lat: number;
//         long: number;
//     };
//     locationText: string;
//     operatingHours: string;
//     organizers: string[];
//     paid: boolean;
//     parentSpaceId: string;
//     rank: number;
//     taggedUsers: string[];
//     seats: number;
//     type: number;
// }

export type BusyLevel = 'busy' | 'normal' | 'free';

interface Space {
    spaceNames: { lang: string; localizedName: string }[];
    type: number[];
    locationText: string;
    location: {
        lat: number;
        long: number;
    };
    operatingHours: string;
    amenityTags: string[];
    images: string[];
    rank: number;
    busyLevel: BusyLevel;
}

export default Space;
