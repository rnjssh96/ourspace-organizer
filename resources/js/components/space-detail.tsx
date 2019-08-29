/**
 * SpaceDetail Config
 */
import {
    service_fee,
    wifi_status,
    plug_status,
    parking_status,
} from '../config/space.json';

import { Locale } from '../model/system.js';

interface ConfigSet {
    [key: string]: { [locale in Locale]: string };
}

const extractConfigKeys = (configSet: ConfigSet): number[] =>
    Object.keys(configSet).map(key => parseFloat(key));

/**
 *
 *
 * SpaceDetail props
 *
 *
 */
interface SpaceDetailProps extends _ReduxProps, _ReduxActionCreators {}

/**
 *
 *
 * SpaceDetail component
 *
 *
 */

import React, { ChangeEvent } from 'react';

import OSEditButton from './os-edit-button';

class _SpaceDetail extends React.Component<SpaceDetailProps> {
    private editModalID = 'space-detail-edit-modal';

    public state: { selected: { [key: string]: number } } = {
        selected: {},
    };

    private _resetEditState = () =>
        this.setState({
            selected: {
                serviceFee: this.props.serviceFee,
                wifi: this.props.wifi,
                plug: this.props.plug,
                parking: this.props.parking,
            },
        });

    private _updateSpaceDetail = () =>
        this.props.currentSpaceID &&
        this.props.updateSpace(this.props.currentSpaceID, 'detail', {
            spaceDetail: {
                serviceFee: this.state.selected['serviceFee'],
                wifi: this.state.selected['wifi'],
                plug: this.state.selected['plug'],
                parking: this.state.selected['parking'],
            },
        });

    private _renderOptionGroup = (
        title: string,
        configs: ConfigSet,
        selected: number,
    ) => (
        <div className="option-group">
            <div className="option-title">
                <p className="h5">{title}</p>
            </div>
            <div className="options">
                {configs[selected] ? (
                    extractConfigKeys(configs).map((configKey: number) => (
                        <div
                            key={configKey}
                            className={`option ${
                                configKey == selected ? 'selected' : ''
                            }`}
                        >
                            <p>{configs[configKey].ko}</p>
                        </div>
                    ))
                ) : (
                    <div className="option">
                        <p>정보없음</p>
                    </div>
                )}
            </div>
        </div>
    );

    private _renderEditOptionGroup = (
        title: string,
        configName: string,
        configs: ConfigSet,
    ) => (
        <div className="input-group">
            <div className="input-group-prepend">
                <div className="input-group-text">
                    <input
                        type="checkbox"
                        checked={this.state.selected[configName] != -1}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            this.setState({
                                selected: {
                                    ...this.state.selected,
                                    [configName]: event.target.checked ? 0 : -1,
                                },
                            })
                        }
                    />
                </div>
                <label className="input-group-text">{title}</label>
            </div>
            <select
                className="custom-select"
                value={this.state.selected[configName]}
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                    this.setState({
                        selected: {
                            ...this.state.selected,
                            [configName]: parseFloat(event.target.value),
                        },
                    })
                }
                disabled={this.state.selected[configName] == -1}
            >
                {extractConfigKeys(configs).map((configKey: number) => (
                    <option key={configKey} value={configKey}>
                        {configs[configKey].ko}
                    </option>
                ))}
            </select>
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
                        <p className="modal-title h5">추가정보 수정</p>
                    </div>
                    <div className="modal-body">
                        {this._renderEditOptionGroup(
                            '시설이용',
                            'serviceFee',
                            service_fee,
                        )}
                        {this._renderEditOptionGroup(
                            '와이파이',
                            'wifi',
                            wifi_status,
                        )}
                        {this._renderEditOptionGroup(
                            '플러그',
                            'plug',
                            plug_status,
                        )}
                        {this._renderEditOptionGroup(
                            '주차공간',
                            'parking',
                            parking_status,
                        )}
                    </div>
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
                            onClick={this._updateSpaceDetail}
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
            <div id="space-detail" className="category">
                <div className="header">
                    <p className="h5">추가 정보</p>
                    <OSEditButton
                        modalID={this.editModalID}
                        onClick={this._resetEditState}
                    />
                </div>
                <div className="body">
                    {this._renderOptionGroup(
                        '시설이용',
                        service_fee,
                        this.props.serviceFee,
                    )}
                    {this._renderOptionGroup(
                        '와이파이',
                        wifi_status,
                        this.props.wifi,
                    )}
                    {this._renderOptionGroup(
                        '플러그',
                        plug_status,
                        this.props.plug,
                    )}
                    {this._renderOptionGroup(
                        '주차공간',
                        parking_status,
                        this.props.parking,
                    )}
                </div>
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

import { SpaceID, SpaceRequestUnit, SpaceUpdate } from '../model/space';

import { updateSpace } from '../thunk-action/current-space';

interface _ReduxProps {
    /**
     * Current space ID
     */
    currentSpaceID?: SpaceID;

    /**
     * Service fee
     */
    serviceFee: number;

    /**
     * Wifi status
     */
    wifi: number;

    /**
     * Plug status
     */
    plug: number;

    /**
     * Parking status
     */
    parking: number;
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
    serviceFee: state.currentSpace.data
        ? state.currentSpace.data.spaceDetail.serviceFee
        : -1,
    wifi: state.currentSpace.data
        ? state.currentSpace.data.spaceDetail.wifi
        : -1,
    plug: state.currentSpace.data
        ? state.currentSpace.data.spaceDetail.plug
        : -1,
    parking: state.currentSpace.data
        ? state.currentSpace.data.spaceDetail.parking
        : -1,
});

const mapDispatchToProps = { updateSpace };

const SpaceDetail = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_SpaceDetail);

export default SpaceDetail;
