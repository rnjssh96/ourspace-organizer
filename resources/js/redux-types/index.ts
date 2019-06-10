import { AuthState } from './auth';
import { SpaceTreesState } from './space-trees';
import { SpaceHistoryState } from './space-history';
import { CurrentSpaceState } from './current-space';
import { SelectedAmenitiesState } from './selected-amenities';
import { UploadImagesState } from './upload-images';

/**
 * Root State Interface
 */
export default interface RootState {
    auth: AuthState;
    spaceTrees: SpaceTreesState;
    spaceHistory: SpaceHistoryState;
    currentSpace: CurrentSpaceState;
    selectedAmenities: SelectedAmenitiesState;
    selectedImages: UploadImagesState;
}
