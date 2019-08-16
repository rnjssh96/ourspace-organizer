/**
 *
 *
 * GeneralInfo props
 *
 *
 */
interface GeneralInfoProps extends _ReduxProps, _ReduxActionCreators {}

/**
 *
 *
 * GeneralInfo component
 *
 *
 */
import React, { ChangeEvent } from 'react';

import {
    SpaceType,
    interpretSpaceType,
    spaceTypes,
    SpaceRequestUnit,
    SpaceID,
} from '../model/space';

import OSEditButton from './os-edit-button';
import OSRateDisplay from './os-rate-display';

class _GeneralInfo extends React.Component<GeneralInfoProps> {
    private editModalID = 'general-info-edit-modal';

    public state: { names: SpaceNames; type: SpaceType } = {
        names: this.props.spaceNames,
        type: this.props.type,
    };

    private _updateGeneralInfo = () => {
        if (this.props.currentSpaceID) {
            this.props.updateSpace(this.props.currentSpaceID, 'title', {
                spaceNames: this.state.names,
                spaceType: this.state.type,
            });
        }
    };

    private _renderTitle = () => {
        const typeText = interpretSpaceType(this.props.type, 'ko');

        return (
            <div id="space-name-row">
                <div id="space-name">
                    <p className="h2">{this.props.spaceNames['ko']}</p>
                    <p id="type" className="h4">
                        {typeText}
                    </p>
                    <OSEditButton
                        modalID={this.editModalID}
                        onClick={() => {
                            this.setState({
                                names: this.props.spaceNames,
                                type: this.props.type,
                            });
                        }}
                    />
                </div>
                <div id="rate">
                    <OSRateDisplay />
                </div>
            </div>
        );
    };

    private _renderModalBody = () => (
        <div className="modal-body">
            <p className="h5">이름</p>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">영어</span>
                </div>
                <input
                    className="form-control"
                    type="text"
                    value={this.state.names.en}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        this.setState({
                            ...this.state,
                            names: {
                                ...this.state.names,
                                en: event.target.value,
                            },
                        });
                    }}
                    placeholder="영어"
                />
            </div>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text">한국어</span>
                </div>
                <input
                    className="form-control"
                    type="text"
                    value={this.state.names.ko}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        this.setState({
                            ...this.state,
                            names: {
                                ...this.state.names,
                                ko: event.target.value,
                            },
                        });
                    }}
                    placeholder="한국어"
                />
            </div>

            <p className="h5">카테고리</p>
            <div className="form-group">
                <select
                    className="form-control"
                    value={spaceTypes[this.state.type].ko}
                    onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                        this.setState({
                            ...this.state,
                            type: event.target.selectedIndex.toString() as SpaceType,
                        });
                    }}
                >
                    {Object.keys(spaceTypes).map((type: string) => (
                        <option key={type}>
                            {spaceTypes[type as SpaceType].ko}
                        </option>
                    ))}
                </select>
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
                        <p className="modal-title h5">공간 수정</p>
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
                            onClick={this._updateGeneralInfo}
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
            <div id="general-info">
                {this._renderTitle()}
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

import { SpaceNames, SpaceUpdate } from '../model/space';

import { updateSpace } from '../thunk-action/current-space';

interface _ReduxProps {
    /**
     * Current space
     */
    currentSpaceID?: SpaceID;

    /**
     * Names of the space
     */
    spaceNames: SpaceNames;

    /**
     * Types of the space
     */
    type: SpaceType;
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
    spaceNames: state.currentSpace.data
        ? state.currentSpace.data.spaceNames
        : { en: '', ko: '' },
    type: state.currentSpace.data ? state.currentSpace.data.spaceType : '0',
});

const mapDispatchToProps = { updateSpace };

const GeneralInfo = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_GeneralInfo);

export default GeneralInfo;
