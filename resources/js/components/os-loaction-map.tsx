import React from 'react';
import { connect } from 'react-redux';

import RootState from '../redux-types';

import { GeoCoordinate } from '../model/space';

import OSGoogleMap from './os-google-map';

interface _ReduxProps {
    /**
     * Geographical coordinate of the space location
     */
    location: GeoCoordinate;
}

interface OSLoactionMapProps extends _ReduxProps {}

class _OSLoactionMap extends React.Component<OSLoactionMapProps> {
    render() {
        return (
            <OSGoogleMap
                id="os-location-map"
                center={{
                    lat: this.props.location.lat,
                    lng: this.props.location.lng,
                }}
                zoom={8}
            />
        );
    }
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    location: state.currentSpace.data.location,
});

const mapDispatchToProps = {};

const OSLoactionMap = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_OSLoactionMap);

export default OSLoactionMap;
