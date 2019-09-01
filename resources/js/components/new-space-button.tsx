/**
 *
 *
 * NewSpaceButton props
 *
 *
 */
interface NewSpaceButtonProps extends _ReduxProps, _ReduxActionCreators {}

/**
 *
 *
 * NewSpaceButton component
 *
 *
 */
import React, { ChangeEvent } from 'react';

import { SpaceType, spaceTypes } from '../model/space';

class _NewSpaceButton extends React.Component<NewSpaceButtonProps> {
    private editModalID = 'new-space-modal';

    public state: {
        enName: string;
        koName: string;
        type: SpaceType;
        address: string;
        lat: string;
        lng: string;
    } = {
        enName: '',
        koName: '',
        type: '0',
        address: '',
        lat: '',
        lng: '',
    };

    private _renderModalBody = () => (
        <div className="modal-body">
            <p className="h5">이름</p>
            <div className="input-group input-row">
                <div className="input-group-prepend">
                    <span className="input-group-text">영어</span>
                </div>
                <input
                    className="form-control"
                    type="text"
                    value={this.state.enName}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        this.setState({
                            ...this.state,
                            enName: event.target.value,
                        });
                    }}
                    placeholder="영어"
                />
            </div>
            <div className="input-group input-row">
                <div className="input-group-prepend">
                    <span className="input-group-text">한국어</span>
                </div>
                <input
                    className="form-control"
                    type="text"
                    value={this.state.koName}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        this.setState({
                            ...this.state,
                            koName: event.target.value,
                        });
                    }}
                    placeholder="한국어"
                />
            </div>

            <p className="h5">카테고리</p>
            <select
                className="form-control input-row"
                value={this.state.type}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    this.setState({
                        ...this.state,
                        type: event.target.value.toString() as SpaceType,
                    });
                }}
            >
                {Object.keys(spaceTypes).map((type: string) => (
                    <option key={type} value={type}>
                        {spaceTypes[type as SpaceType].ko}
                    </option>
                ))}
            </select>

            <p className="h5">주소</p>
            <input
                className="form-control input-row"
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

            <p className="h5">지도 좌표</p>
            <div id="latlng-form" className="input-row">
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
                                lat: event.target.value,
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
                                lng: event.target.value,
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
                        <p className="modal-title h5">공간 수정</p>
                    </div>
                    {this._renderModalBody()}
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            취소
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-dismiss="modal"
                        >
                            생성
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    render() {
        return (
            <div id="new-space-button">
                <a
                    id="os-edit-button"
                    data-toggle={'modal'}
                    data-target={`#${this.editModalID}`}
                    onClick={() => {}}
                >
                    Create New
                </a>
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

interface _ReduxProps {}

interface _ReduxActionCreators {}

const mapStateToProps = (state: RootState): _ReduxProps => ({});

const mapDispatchToProps = {};

const NewSpaceButton = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_NewSpaceButton);

export default NewSpaceButton;
