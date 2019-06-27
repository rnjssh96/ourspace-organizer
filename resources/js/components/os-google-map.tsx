import React from 'react';

interface OSGoogleMapProps {
    /**
     * Id of the element
     */
    id: string;

    /**
     * Options of the map
     */
    center: google.maps.LatLng | google.maps.LatLngLiteral; // center of the map
    zoom: number; // initial zoom level
}

export default class OSGoogleMap extends React.Component<OSGoogleMapProps> {
    private _map?: google.maps.Map;
    private _marker?: google.maps.Marker;

    componentDidMount() {
        this._map = new google.maps.Map(
            document.getElementById(this.props.id),
            {
                center: this.props.center,
                zoom: this.props.zoom,
                // default setting
                clickableIcons: false, // POI icons not clickable
                mapTypeControl: false, // disable map type control
                fullscreenControl: false, // disable full screen control
                streetViewControl: false, // disable street view control
            },
        );

        // Display temporary marker
        this._marker = new google.maps.Marker({
            position: this.props.center,
            map: this._map,
        });
    }

    componentDidUpdate(prevProps: OSGoogleMapProps) {
        if (this._map) {
            // center changed
            if (prevProps.center !== this.props.center) {
                this._map.setCenter(this.props.center);
            }

            // Display temporary marker
            if (this._marker) {
                this._marker.setPosition(this.props.center);
            } else {
                this._marker = new google.maps.Marker({
                    position: this.props.center,
                    map: this._map,
                });
            }
        }
    }

    render() {
        return <div id={this.props.id} />;
    }
}
