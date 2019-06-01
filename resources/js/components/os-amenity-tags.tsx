import React from 'react';
import { connect } from 'react-redux';

import RootState from '../redux-types';

import { AmenityTag, interpretAmenity } from '../model/space';

interface _ReduxProps {
    /**
     * Amenity tabs of the space
     */
    amenityTags: AmenityTag[];
}

interface OSAmenityTagsProps extends _ReduxProps {}

class _OSAmenityTags extends React.Component<OSAmenityTagsProps> {
    private _renderAmenity = (tag: AmenityTag) => {
        let amenity = interpretAmenity(tag, 'ko');
        return (
            <div key={tag} className="amenity">
                <p className="h1">
                    <i className={amenity.faicon} />
                </p>
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
                    <a>
                        <p className="h6 os-grey-1">
                            <i className="material-icons">add</i>
                            추가
                        </p>
                    </a>
                </div>
                <div id="amenities">{this._rednerAmenities()}</div>
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
