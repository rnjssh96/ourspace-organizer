import React from 'react';
import { connect } from 'react-redux';

import { BusyLevel } from '../model/space';

import RootState from '../redux-types';
import { setBusyLevel } from '../actions/current-space';

interface _ReduxProps {
    /**
     * Busy level of the space
     */
    busyLevel: BusyLevel;
}

interface _RedusActionCreators {
    /**
     * Set busy level of the space
     */
    setBusyLevel: typeof setBusyLevel;
}

interface OSBusyLevelSelectorProps extends _ReduxProps, _RedusActionCreators {}

class _OSBusyLevelSelector extends React.Component<OSBusyLevelSelectorProps> {
    private _interpretBusyLevel = (level: BusyLevel) => {
        if (level == 'busy') {
            return '바쁨';
        }
        if (level == 'normal') {
            return '보통';
        } else {
            return '여유';
        }
    };

    private _renderButton = (level: BusyLevel) => (
        <button
            className={`${this.props.busyLevel == level ? 'selected' : ''}`}
            onClick={() => {
                this.props.setBusyLevel(level);
            }}
        >
            <p className="h6">{this._interpretBusyLevel(level)}</p>
        </button>
    );

    render() {
        return (
            <div id="os-busy-level-selector">
                <p className="h3">
                    <b>{this._interpretBusyLevel(this.props.busyLevel)}</b>
                </p>
                <div id="buttons">
                    {this._renderButton('busy')}
                    {this._renderButton('normal')}
                    {this._renderButton('free')}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    busyLevel: state.currentSpace.busyLevel,
});

const mapDispatchToProps = {
    setBusyLevel,
};

const OSBusyLevelSelector = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_OSBusyLevelSelector);

export default OSBusyLevelSelector;
