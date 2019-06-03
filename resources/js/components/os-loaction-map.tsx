import React from 'react';
import { connect } from 'react-redux';

import RootState from '../redux-types';

import { GeoCoordinate } from '../model/space';

interface _ReduxProps {
    /**
     * Geographical coordinate of the space location
     */
    location: GeoCoordinate;
}

interface OSLoactionMapProps extends _ReduxProps {}

class _OSLoactionMap extends React.Component<OSLoactionMapProps> {
    componentDidMount() {
        console.log(this.props.location.lat);
        const map = new google.maps.Map(
            document.getElementById('os-location-map'),
            {
                center: {
                    lat: this.props.location.lat,
                    lng: this.props.location.lng,
                },
                zoom: 8,
            },
        );
    }

    render() {
        return <div id="os-location-map" />;
    }
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    location: state.currentSpace.location,
});

const mapDispatchToProps = {};

const OSLoactionMap = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_OSLoactionMap);

export default OSLoactionMap;
