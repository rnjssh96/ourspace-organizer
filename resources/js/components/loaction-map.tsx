/**
 *
 *
 * LoactionMap props
 *
 *
 */
interface LoactionMapProps extends _ReduxProps, _ReduxActionCreators {}

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
import OSEditButton from './os-edit-button';

class _LoactionMap extends React.Component<LoactionMapProps> {
    private editModalID = 'location-edit-modal';

    public state: { address: string; lat: number; lng: number } = {
        address: '',
        lat: 0.0,
        lng: 0.0,
    };

    private _updateLocationInfo = () =>
        this.props.currentSpaceID &&
        this.props.updateSpace(this.props.currentSpaceID, 'location', {
            location_text: this.state.address,
            latitude: this.state.lat,
            longitude: this.state.lng,
        });

    private _renderAddress = () => (
        <p className="h5" id="address-text">
            {this.props.spaceAddress
                ? this.props.spaceAddress
                : '등록된 주소가 없습니다.'}
        </p>
    );
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

    private _renderModalBody = () => (
        <div className="modal-body">
            <p className="h5">위치정보</p>
            <input
                className="form-control"
                type="text"
                placeholder="상세 주소"
                value={this.state.address}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    this.setState({
                        ...this.state,
                        address: event.target.value,
                    });
                }}
            />
            <div id="latlng-form">
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">위도</span>
                    </div>
                    <input
                        className="form-control"
                        type="number"
                        min="-90"
                        max="90"
                        placeholder="위도"
                        value={this.state.lat}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                            this.setState({
                                ...this.state,
                                lat: parseFloat(event.target.value),
                            });
                        }}
                    />
                </div>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">경도</span>
                    </div>
                    <input
                        className="form-control"
                        type="number"
                        min="-180"
                        max="180"
                        placeholder="경도"
                        value={this.state.lng}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                            this.setState({
                                ...this.state,
                                lng: parseFloat(event.target.value),
                            });
                        }}
                    />
                </div>
            </div>
        </div>
    );

    private _renderEditModal = () => (
        <div
            id={this.editModalID}
            className="modal fade"
            tabIndex={-1}
            role="dialog"
            aria-hidden="true"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="modal-title h5">위치정보 수정</p>
                    </div>
                    {this._renderModalBody()}
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            닫기
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-dismiss="modal"
                            onClick={this._updateLocationInfo}
                        >
                            저장
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    render() {
        return (
            <div id="location-map" className="category">
                <div className="header">
                    <p className="h5">위치</p>
                    <OSEditButton
                        modalID={this.editModalID}
                        onClick={() => {
                            this.props.spaceAddress &&
                                this.props.location &&
                                this.setState({
                                    address: this.props.spaceAddress,
                                    lat: this.props.location.lat,
                                    lng: this.props.location.lng,
                                });
                        }}
                    />
                </div>
                {this._renderAddress()}
                <div className="body">{this._renderMap()}</div>
                {this._renderEditModal()}
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

import { LatLng, SpaceID, SpaceRequestUnit, SpaceUpdate } from '../model/space';

import { updateSpace } from '../thunk-action/current-space';

interface _ReduxProps {
    /**
     * Current space ID
     */
    currentSpaceID?: SpaceID;

    /**
     * Geographical coordinate of the space location
     */
    location?: LatLng;

    /**
     * Space address
     */
    spaceAddress?: string;
}

interface _ReduxActionCreators {
    /**
     * Update space data on the server
     */
    updateSpace: (
        spaceID: SpaceID,
        requestUnit: SpaceRequestUnit,
        spaceUpdate: SpaceUpdate,
    ) => void;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    currentSpaceID: state.currentSpace.data && state.currentSpace.data.id,
    location: state.currentSpace.data && state.currentSpace.data.location,
    spaceAddress:
        state.currentSpace.data && state.currentSpace.data.spaceAddress,
});

const mapDispatchToProps = { updateSpace };

const LoactionMap = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_LoactionMap);

export default LoactionMap;
