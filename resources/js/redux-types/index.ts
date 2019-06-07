import { SpaceTreesState } from './space-trees';
import { CurrentSpaceState } from './current-space';
import { SelectedAmenitiesState } from './selected-amenities';
import { UploadImagesState } from './upload-images';

/**
 * Root State Interface
 */
export default interface RootState {
    spaceTrees: SpaceTreesState;
    currentSpace: CurrentSpaceState;
    selectedAmenities: SelectedAmenitiesState;
    selectedImages: UploadImagesState;
}
