import React from 'react';
import { compose, withProps } from 'recompose';
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker,
} from 'react-google-maps';

const OSLoactionMap = compose(
    withProps({
        googleMapURL:
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyDQKkNsepBOaIiSSp4OUIFZGKmCOFTrho4&callback=initMap',
        loadingElement: <div style={{ height: '100%' }} />,
        containerElement: <div id="os-location-map" />,
        mapElement: <div id="map" />,
    }),
    withScriptjs,
    withGoogleMap,
)(props => (
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        mapTypeId={'roadmap'}
    >
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
    </GoogleMap>
));

export default OSLoactionMap;
