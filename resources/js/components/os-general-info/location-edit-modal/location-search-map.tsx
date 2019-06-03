import React from 'react';

import createGoogleMap from '../../../google-maps-api';

export default class LocationSearchMap extends React.Component {
    componentDidMount() {
        const map = createGoogleMap('location-search-map', {
            center: { lat: 41.0082, lng: 28.9784 },
            zoom: 8,
        });
    }

    render() {
        return <div id="location-search-map" />;
    }
}
