import { UploadImagesMap } from './upload-images';

/**
 * Action Interfaces
 */
export type UploadImagesToServerAction = (
    spaceID: string,
    images: UploadImagesMap,
    currentImages: string[],
) => void;
