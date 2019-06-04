import React from 'react';

import OSGoogleMap from '../../os-google-map';

export default class LocationSearchMap extends React.Component {
    render() {
        return (
            <OSGoogleMap
                id="location-search-map"
                center={{
                    lat: 41.0082,
                    lng: 28.9784,
                }}
                zoom={8}
            />
        );
    }
}
