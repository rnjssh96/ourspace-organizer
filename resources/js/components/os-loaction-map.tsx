import React from 'react';

import createGoogleMap from '../google-maps-api';

export default class OSLoactionMap extends React.Component {
    componentDidMount() {
        const map = createGoogleMap('os-location-map', {
            center: { lat: 41.0082, lng: 28.9784 },
            zoom: 8,
        });
    }

    render() {
        return <div id="os-location-map" />;
    }
}
