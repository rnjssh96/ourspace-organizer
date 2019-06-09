import React from 'react';
import { connect } from 'react-redux';

import RootState from '../../redux-types';

import { AmenityTag, interpretAmenity } from '../../model/space';

import { setSelectedAmenities } from '../../actions/selected-amenities';

import AmenitiesEditModal, {
    AmenitiesEditModalID,
} from './amenities-edit-modal';

interface _ReduxProps {
    /**
     * Amenity tags of the space
     */
    amenityTags?: AmenityTag[];
}

interface _ReduxActionCreators {
    /**
     * Set selected amenities
     */
    setSelectedAmenities: typeof setSelectedAmenities;
}

interface OSAmenityTagsProps extends _ReduxProps, _ReduxActionCreators {}

class _OSAmenityTags extends React.Component<OSAmenityTagsProps> {
    private _renderEmpty = () => {
        return (
            <div id="empty">
                <p className="h6">등록된 편의시설이 없습니다.</p>
            </div>
        );
    };

    private _renderAmenity = (tag: AmenityTag) => {
        let amenity = interpretAmenity(tag, 'ko');
        return (
            <div key={tag} className="amenity">
                <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title={amenity.name}
                >
                    <p className="h1" data-toggle="tooltip">
                        <i className={amenity.faicon} />
                    </p>
                </a>
            </div>
        );
    };

    private _renderAmenities = () => {
        if (this.props.amenityTags && this.props.amenityTags.length > 0) {
            return this.props.amenityTags.map((tag: AmenityTag) =>
                this._renderAmenity(tag),
            );
        } else {
            return this._renderEmpty();
        }
    };

    private _resetSelectedAmenities = () => {
        this.props.setSelectedAmenities(new Set(this.props.amenityTags));
    };

    render() {
        return (
            <div id="os-amenity-tags">
                <div className="header">
                    <p className="h5">편의시설</p>
                    <button
                        data-toggle="modal"
                        data-target={`#${AmenitiesEditModalID}`}
                        onClick={this._resetSelectedAmenities}
                    >
                        <p className="h6 os-grey-1">
                            <i className="material-icons">add</i>
                            추가
                        </p>
                    </button>
                    <AmenitiesEditModal />
                </div>
                <div className="body">
                    <div id="amenities">{this._renderAmenities()}</div>
                </div>
                <div className="footer">
                    <p className="h6 os-grey-1">
                        <i className="material-icons">info</i>
                        마우스를 아이콘 위에 올리시면 설명을 볼 수 있습니다.
                    </p>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    amenityTags: state.currentSpace.data && state.currentSpace.data.amenityTags,
});

const mapDispatchToProps = {
    setSelectedAmenities,
};

const OSAmenityTags = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_OSAmenityTags);

export default OSAmenityTags;
