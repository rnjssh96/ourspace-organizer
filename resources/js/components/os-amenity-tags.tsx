import React from 'react';

export default class OSAmenityTags extends React.Component {
    private _renderAmenity(amenity: any, name: any) {
        return (
            <div className="amenity">
                <i className="material-icons">{amenity}</i>
                <p className="h6">{name}</p>
            </div>
        );
    }

    render() {
        return (
            <div id="os-amenity-tags">
                <div id="amenities">
                    {this._renderAmenity('wifi', 'Wi-Fi')}
                    {this._renderAmenity('local_cafe', 'Coffee')}
                    {this._renderAmenity('local_dining', 'Food')}
                    {this._renderAmenity('wifi', 'Wi-Fi')}
                    {this._renderAmenity('local_cafe', 'Coffee')}
                    {this._renderAmenity('local_dining', 'Food')}
                </div>
            </div>
        );
    }
}
