/**
 *
 *
 * LoactionMap props
 *
 *
 */
interface LoactionMapProps extends _ReduxProps {}

/**
 *
 *
 * LoactionMap component
 *
 *
 */
import React from 'react';

import OSGoogleMap from './os-google-map';
import OSPageStatus from './os-page-status';

class _LoactionMap extends React.Component<LoactionMapProps> {
    private _renderMap = () => {
        if (this.props.location) {
            return (
                <OSGoogleMap
                    id="map"
                    center={{
                        lat: this.props.location.lat,
                        lng: this.props.location.lng,
                    }}
                    zoom={17}
                />
            );
        } else {
            return (
                <div id="no-info">
                    <OSPageStatus
                        status="information"
                        info="위치정보가 존재하지 않습니다."
                    />
                </div>
            );
        }
    };

    render() {
        return (
            <div id="location-map" className="category">
                <div className="header">
                    <p className="h5">위치</p>
                </div>
                <div className="body">{this._renderMap()}</div>
            </div>
        );
    }
}

/**
 *
 *
 * Connect redux
 *
 *
 */
import { connect } from 'react-redux';
import RootState from '../redux-types';

import { LatLng } from '../model/space';

interface _ReduxProps {
    /**
     * Geographical coordinate of the space location
     */
    location?: LatLng;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    location: state.currentSpace.data && state.currentSpace.data.location,
});

const mapDispatchToProps = {};

const LoactionMap = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_LoactionMap);

export default LoactionMap;
