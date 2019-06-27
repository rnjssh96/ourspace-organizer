/**
 *
 *
 * AmenityTags props
 *
 *
 */
interface AmenityTagsProps extends _ReduxProps, _ReduxActionCreators {}

/**
 *
 *
 * AmenityTags component
 *
 *
 */
import React from 'react';

import { AmenityTag, interpretAmenity } from '../../model/space';

import AmenitiesEditModal, {
    AmenitiesEditModalID,
} from './amenities-edit-modal';

import OSPageStatus from '../os-page-status';

class _AmenityTags extends React.Component<AmenityTagsProps> {
    private _resetSelectedAmenities = () => {
        this.props.setSelectedAmenities(new Set(this.props.amenityTags));
    };

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
        if (this.props.updatingAmentiyTags.status === 'requesting') {
            return <OSPageStatus status="loading" />;
        } else if (
            this.props.amenityTags &&
            this.props.amenityTags.length > 0
        ) {
            return this.props.amenityTags.map((tag: AmenityTag) =>
                this._renderAmenity(tag),
            );
        } else {
            return this._renderEmpty();
        }
    };

    render_temp() {
        return (
            <div id="amenity-tags">
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

    render() {
        return (
            <div id="amenity-tags" className="category">
                <div className="header">
                    <p className="h5">편의시설</p>
                    <OSEditButton
                        modalID={AmenitiesEditModalID}
                        onClick={this._resetSelectedAmenities}
                    />
                </div>
                <div className="body">
                    <div id="amenities">{this._renderAmenities()}</div>
                </div>
                <AmenitiesEditModal />
            </div>
        );
    }
}

/**
 *
 *
 * Connect redux
 *
 *
 */
import { connect } from 'react-redux';
import RootState from '../../redux-types';

import { RequestStatus } from '../../model/system';

import { setSelectedAmenities } from '../../actions/selected-amenities';
import OSEditButton from '../os-edit-button';

interface _ReduxProps {
    /**
     * Amenity tags of the space
     */
    amenityTags?: AmenityTag[];

    /**
     * Updating amenity tags
     */
    updatingAmentiyTags: RequestStatus;
}

interface _ReduxActionCreators {
    /**
     * Set selected amenities
     */
    setSelectedAmenities: typeof setSelectedAmenities;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    amenityTags: state.currentSpace.data && state.currentSpace.data.amenityTags,
    updatingAmentiyTags: state.currentSpace.updatingATStatus,
});

const mapDispatchToProps = {
    setSelectedAmenities,
};

const AmenityTags = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_AmenityTags);

export default AmenityTags;
