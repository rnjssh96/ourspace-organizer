import React from 'react';
import { connect } from 'react-redux';

import RootState from '../redux-types';

import { LatLng } from '../model/space';

import OSGoogleMap from './os-google-map';
import OSPageStatus from './os-page-status';

interface _ReduxProps {
    /**
     * Geographical coordinate of the space location
     */
    location?: LatLng;
}

interface OSLoactionMapProps extends _ReduxProps {}

class _OSLoactionMap extends React.Component<OSLoactionMapProps> {
    render() {
        if (this.props.location) {
            return (
                <OSGoogleMap
                    id="os-location-map"
                    center={{
                        lat: this.props.location.lat,
                        lng: this.props.location.lng,
                    }}
                    zoom={17}
                />
            );
        } else {
            return (
                <OSPageStatus
                    status="information"
                    info="위치정보가 존재하지 않습니다."
                />
            );
        }
    }
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    location: state.currentSpace.data && state.currentSpace.data.location,
});

const mapDispatchToProps = {};

const OSLoactionMap = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_OSLoactionMap);

export default OSLoactionMap;
