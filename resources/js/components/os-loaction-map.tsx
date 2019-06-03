import React from 'react';
import { compose, withProps } from 'recompose';
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
} from 'react-google-maps';

import { GoogleMapsApi } from '../config';

class _OSLocationMap extends React.Component {
    render() {
        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: -34.397, lng: 150.644 }}
                mapTypeId={'roadmap'}
            >
                <Marker position={{ lat: -34.397, lng: 150.644 }} />
            </GoogleMap>
        );
    }
}

const OSLoactionMap = compose(
    withProps({
        // withGoogleMap props
        containerElement: <div id="os-location-map" />,
        mapElement: <div id="map" />,
        // withScriptjs props
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
            GoogleMapsApi.API_KEY
        }`,
        loadingElement: <div id="what" style={{ height: '100%' }} />,
    }),
    withScriptjs,
    withGoogleMap,
)(_OSLocationMap);

export default OSLoactionMap;
