import React, { ChangeEvent, MouseEvent } from 'react';

import * as DayInterpret from '../../config/weekdays.json';

/**
 *
 *
 * OperatingHourEditModal props
 *
 *
 */
interface OperatingHourEditModalProps
    extends _ReduxProps,
        _ReduxActionCreators {}

/**
 *
 *
 * OperatingHourEditModal component
 *
 *
 */
export const OperatingHourEditModalID = 'operating-hour-edit-modal';

type Day = keyof typeof DayInterpret;

interface DayOperatingTime {
    off: boolean;
    startTime: string;
    endTime: string;
}

class _OperatingHourEditModal extends React.Component<
    OperatingHourEditModalProps
> {
    state: { [key in Day]: DayOperatingTime } = {
        MON: { off: true, startTime: '00:00', endTime: '00:00' },
        TUE: { off: true, startTime: '00:00', endTime: '00:00' },
        WED: { off: true, startTime: '00:00', endTime: '00:00' },
        THU: { off: true, startTime: '00:00', endTime: '00:00' },
        FRI: { off: true, startTime: '00:00', endTime: '00:00' },
        SAT: { off: true, startTime: '00:00', endTime: '00:00' },
        SUN: { off: true, startTime: '00:00', endTime: '00:00' },
    };

    private _saveOperatingHour = (event: MouseEvent) => {
        event.preventDefault();

        if (this.props.currentSpaceID) {
            let map: { [time: string]: Day[] } = {};
            let priority: string[] = [];

            Object.keys(this.state).map((day: string) => {
                if (this.state[day as Day].off) {
                    return;
                }
                let timeKey = `${this.state[day as Day].startTime} - ${
                    this.state[day as Day].endTime
                }`;
                if (map[timeKey]) {
                    map[timeKey].push(day as Day);
                } else {
                    map[timeKey] = [day as Day];
                    priority.push(timeKey);
                }
            });

            let temp = '';
            let result = priority.map((timeKey: string) => {
                temp = `${timeKey} / `;
                map[timeKey].map((day: Day, index: number) => {
                    if (index > 0) {
                        temp += ', ';
                    }
                    temp += DayInterpret[day]['ko'];
                });
                return temp;
            });
            this.props.updateOperatingHours(this.props.currentSpaceID, result);
        }
    };

    private _renderRow = (day: Day) => {
        const operatingTime = this.state[day];
        const changeState = (key: string, value: any) => {
            this.setState({
                ...this.state,
                [day]: {
                    ...operatingTime,
                    [key]: value,
                },
            });
        };

        return (
            <div
                key={day}
                className={`table-row ${
                    operatingTime.off ? 'day-off' : 'day-on'
                }`}
            >
                <div
                    className="table-col table-col-day"
                    onClick={() => {
                        changeState('off', !operatingTime.off);
                    }}
                >
                    <p className="h6">{DayInterpret[day]['ko']}</p>
                </div>
                {operatingTime.off && (
                    <div className="table-col day-off">
                        <p className="h6">휴무</p>
                    </div>
                )}
                {!operatingTime.off && (
                    <div className="table-col">
                        <input
                            type="time"
                            value={operatingTime.startTime}
                            required
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                changeState('startTime', e.target.value);
                            }}
                        />
                    </div>
                )}
                {!operatingTime.off && (
                    <div className="table-col">
                        <input
                            type="time"
                            value={operatingTime.endTime}
                            required
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                changeState('endTime', e.target.value);
                            }}
                        />
                    </div>
                )}
            </div>
        );
    };

    private _renderTable = () => {
        return (
            <div id="table">
                {Object.keys(this.state).map((day: string) =>
                    this._renderRow(day as Day),
                )}
            </div>
        );
    };

    render() {
        return (
            <div
                id={OperatingHourEditModalID}
                className="modal fade"
                tabIndex={-1}
                role="dialog"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <form>
                        <div className="modal-content">
                            <div className="modal-header">
                                <p className="modal-title h5">운영시간 수정</p>
                            </div>
                            <div className="modal-body">
                                {this._renderTable()}
                                <p className="h6">
                                    <i className="material-icons">info</i>
                                    요일을 클릭하여 휴무여부를 변경할 수
                                    있습니다.
                                </p>
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
                                    type="submit"
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                    onClick={this._saveOperatingHour}
                                >
                                    저장
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
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
import RootState from '../../redux-types';

import { updateOperatingHours } from '../../thunk-action/current-space';

interface _ReduxProps {
    /**
     * Current space ID
     */
    currentSpaceID?: string;
}

interface _ReduxActionCreators {
    /**
     * Update operating hours of the space
     */
    updateOperatingHours: (spaceID: string, operatingHours: string[]) => void;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    currentSpaceID: state.currentSpace.data && state.currentSpace.data.id,
});

const mapDispatchToProps = {
    updateOperatingHours,
};

const OperatingHourEditModal = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_OperatingHourEditModal);

export default OperatingHourEditModal;
