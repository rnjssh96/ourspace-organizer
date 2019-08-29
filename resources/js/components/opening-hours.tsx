/**
 *
 *
 * OpeningHours props
 *
 *
 */
interface OpeningHoursProps extends _ReduxProps, _ReduxActionCreators {}

/**
 *
 *
 * OpeningHours component
 *
 *
 */
import React from 'react';

import OSEditButton from './os-edit-button';

import { OpeningHours, DAYS_IN_WEEK, WeekDay } from '../model/space';

const DAYS: { [day in WeekDay]: string } = {
    mon: '월',
    tue: '화',
    wed: '수',
    thu: '목',
    fri: '금',
    sat: '토',
    sun: '일',
};

const NO_PROVIDE_STATE = {
    mon: { open: '' },
    tue: { open: '' },
    wed: { open: '' },
    thu: { open: '' },
    fri: { open: '' },
    sat: { open: '' },
    sun: { open: '' },
};

const ALL_OFF_STATE = {
    mon: { open: '00:00', close: '00:00' },
    tue: { open: '00:00', close: '00:00' },
    wed: { open: '00:00', close: '00:00' },
    thu: { open: '00:00', close: '00:00' },
    fri: { open: '00:00', close: '00:00' },
    sat: { open: '00:00', close: '00:00' },
    sun: { open: '00:00', close: '00:00' },
};

class _OpeningHours extends React.Component<OpeningHoursProps> {
    private editModalID = 'opening-hours-edit-modal';

    public state: {
        [day in WeekDay]: { open: string; close?: string }
    } = NO_PROVIDE_STATE;

    private _updateOpeningHours = () => {
        if (this.props.currentSpaceID) {
            let result: any = {};
            DAYS_IN_WEEK.forEach((day: WeekDay) => {
                result[day] = this.state[day].open;
                this.state[day].close &&
                    (result[day] += '\\' + this.state[day].close);
            });
            this.props.updateSpace(this.props.currentSpaceID, 'opening-hours', {
                openingHours: result,
            });
        }
    };

    private _resetEditState = () =>
        this.props.openingHours && this.setState(this.props.openingHours);

    private _onOptionChanged = () =>
        this.props.openingHours &&
        this.setState(
            this.state.mon.open === ''
                ? this.props.openingHours.mon.open === ''
                    ? ALL_OFF_STATE
                    : this.props.openingHours
                : NO_PROVIDE_STATE,
        );

    private _onDayClicked = (day: WeekDay) => {
        let newState = this.state;
        newState[day] =
            this.props.openingHours && newState[day].close == '00:00'
                ? this.props.openingHours[day].open === '' ||
                  this.props.openingHours[day].close === '00:00'
                    ? { open: '00:00', close: '24:00' }
                    : this.props.openingHours[day]
                : { open: '00:00', close: '00:00' };
        this.setState(newState);
    };

    private _onTimeChange = (
        day: WeekDay,
        oc: 'open' | 'close',
        value: string,
    ) =>
        this.props.openingHours &&
        this.setState({
            ...this.state,
            [day]: { ...this.state[day], [oc]: value },
        });

    private _renderTableData = () => {
        if (this.props.openingHours) {
            if (this.props.openingHours.mon.open == '') {
                // If information is NOT provided
                return <p id="no-info">운영시간 정보가 없습니다.</p>;
            } else {
                // If information is provied
                return DAYS_IN_WEEK.map((day: WeekDay) => {
                    if (this.props.openingHours!![day].close == '00:00') {
                        // off
                        return (
                            <div key={day} className="col">
                                <div className="cell">
                                    <p>휴무</p>
                                </div>
                            </div>
                        );
                    } else {
                        // working
                        return (
                            <div key={day} className="col">
                                <div className="cell">
                                    <p>{this.props.openingHours!![day].open}</p>
                                </div>
                                <div className="cell">
                                    <p>
                                        {this.props.openingHours!![day].close}
                                    </p>
                                </div>
                            </div>
                        );
                    }
                });
            }
        }
    };

    private _renderModalBody = () => (
        <div className="modal-body">
            <div className="option-row">
                <input
                    type="radio"
                    name="optionRadio"
                    checked={this.state.mon.open === ''}
                    onChange={this._onOptionChanged}
                />
                <label>운영시간 정보 제공 안함</label>
            </div>
            <div className="option-row">
                <input
                    type="radio"
                    name="optionRadio"
                    checked={this.state.mon.open !== ''}
                    onChange={this._onOptionChanged}
                />
                <label>운영시간 정보 제공</label>
            </div>
            {this.state.mon.open !== '' && (
                <div id="oh-edit-table">
                    <div className="table-row header-row">
                        <div className="cell row-header" />
                        <div className="cell">오픈</div>
                        <div className="cell">마감</div>
                    </div>
                    {DAYS_IN_WEEK.map((day: WeekDay) =>
                        this.state[day].close === '00:00' ? (
                            <div key={day} className="table-row">
                                <div
                                    className="cell row-header"
                                    onClick={() => {
                                        this._onDayClicked(day);
                                    }}
                                >
                                    {DAYS[day]}
                                </div>
                                <div className="cell">
                                    <p>휴무</p>
                                </div>
                            </div>
                        ) : (
                            <div key={day} className="table-row">
                                <div
                                    className="cell row-header active"
                                    onClick={() => {
                                        this._onDayClicked(day);
                                    }}
                                >
                                    {DAYS[day]}
                                </div>
                                <div className="cell">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={this.state[day].open}
                                        onChange={(
                                            event: React.ChangeEvent<
                                                HTMLInputElement
                                            >,
                                        ) => {
                                            this._onTimeChange(
                                                day,
                                                'open',
                                                event.target.value,
                                            );
                                        }}
                                        placeholder="hh:mm"
                                    />
                                </div>
                                <div className="cell">
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={this.state[day].close}
                                        onChange={(
                                            event: React.ChangeEvent<
                                                HTMLInputElement
                                            >,
                                        ) => {
                                            this._onTimeChange(
                                                day,
                                                'close',
                                                event.target.value,
                                            );
                                        }}
                                        placeholder="hh:mm"
                                    />
                                </div>
                            </div>
                        ),
                    )}
                </div>
            )}
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
                        <p className="modal-title h5">운영시간 수정</p>
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
                            onClick={this._updateOpeningHours}
                        >
                            저장
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    render() {
        if (!this.props.openingHours) {
            return null;
        }
        return (
            <div id="opening-hours" className="category">
                <div className="header">
                    <p className="h5">운영시간</p>
                    <OSEditButton
                        modalID={this.editModalID}
                        onClick={this._resetEditState}
                    />
                </div>
                <div className="body">
                    <div id="oh-table">
                        <div id="table-header">
                            <div className="cell" />
                            {DAYS_IN_WEEK.map((day: WeekDay) => (
                                <div key={day} className="cell h5">
                                    {DAYS[day]}
                                </div>
                            ))}
                        </div>
                        <div id="table-body">
                            <div id="table-col-header">
                                <div className="cell">오픈</div>
                                <div className="cell">마감</div>
                            </div>
                            <div id="table-data">{this._renderTableData()}</div>
                        </div>
                    </div>
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
     * Operating hours and days
     */
    openingHours?: OpeningHours;
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
    openingHours:
        state.currentSpace.data && state.currentSpace.data.openingHours,
});

const mapDispatchToProps = { updateSpace };

const OpeningHours = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_OpeningHours);

export default OpeningHours;
