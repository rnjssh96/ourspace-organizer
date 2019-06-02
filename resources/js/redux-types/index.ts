import { CurrentSpaceState } from './current-space';
import { SelectedAmenitiesState } from './selected-amenities';

/**
 * Root State Interface
 */
export default interface RootState {
    currentSpace: CurrentSpaceState;
    selectedAmenities: SelectedAmenitiesState;
}
