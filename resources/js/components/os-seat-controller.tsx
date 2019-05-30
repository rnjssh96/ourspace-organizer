import React from 'react';

export default class OSSeatController extends React.Component {
    render() {
        return (
            <div id="os-seat-controller">
                <p className="h6 os-grey-1">
                    <b>좌석 현황</b>
                </p>
                <div id="controller">
                    <div id="current-seats">
                        <p className="h4 os-grey-1">
                            <b>15</b>
                        </p>
                    </div>
                    <div id="bottom-controll">
                        <div className="input-group">
                            <input
                                id="increment-input"
                                type="number"
                                className="form-control"
                                placeholder="좌석 수"
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-secondary"
                                    type="button"
                                >
                                    추가
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    type="button"
                                >
                                    제거
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
