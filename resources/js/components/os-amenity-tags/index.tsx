import React from 'react';
import { connect } from 'react-redux';

import RootState from '../../redux-types';

import { AmenityTag, interpretAmenity } from '../../model/space';

import AmenitiesEditModal, {
    AmenitiesEditModalID,
} from './amenities-edit-modal';

interface _ReduxProps {
    /**
     * Amenity tags of the space
     */
    amenityTags: AmenityTag[];
}

interface OSAmenityTagsProps extends _ReduxProps {}

class _OSAmenityTags extends React.Component<OSAmenityTagsProps> {
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

    private _rednerAmenities = () =>
        this.props.amenityTags.map((tag: AmenityTag) =>
            this._renderAmenity(tag),
        );

    render() {
        return (
            <div id="os-amenity-tags">
                <div id="header">
                    <p className="h5">편의시설</p>
                    <button
                        data-toggle="modal"
                        data-target={`#${AmenitiesEditModalID}`}
                    >
                        <p className="h6 os-grey-1">
                            <i className="material-icons">add</i>
                            추가
                        </p>
                    </button>
                    <AmenitiesEditModal amenityTags={this.props.amenityTags} />
                </div>
                <div id="body">
                    <div id="amenities">{this._rednerAmenities()}</div>
                </div>
                <div id="footer">
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
    amenityTags: state.currentSpace.amenityTags,
});

const mapDispatchToProps = {};

const OSAmenityTags = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_OSAmenityTags);

export default OSAmenityTags;
