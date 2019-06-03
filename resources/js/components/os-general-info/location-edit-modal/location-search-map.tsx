import React from 'react';

export default class LocationSearchMap extends React.Component {
    componentDidMount() {
        const map = new google.maps.Map(
            document.getElementById('location-search-map'),
            {
                center: { lat: 41.0082, lng: 28.9784 },
                zoom: 8,
            },
        );
    }

    render() {
        return <div id="location-search-map" />;
    }
}
