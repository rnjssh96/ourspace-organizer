import { State as AuthState } from './auth';
import { State as SpaceListState } from './space-list';
import { State as SpaceHistoryState } from './space-history';
import { State as CurrentSpaceState } from './current-space';
import { State as SelectedAmenitiesState } from './selected-amenities';
import { State as UploadImagesState } from './upload-images';

/**
 * Root State Interface
 */
export default interface RootState {
    auth: AuthState;
    spaceList: SpaceListState;
    spaceHistory: SpaceHistoryState;
    currentSpace: CurrentSpaceState;
    selectedAmenities: SelectedAmenitiesState;
    selectedImages: UploadImagesState;
}
