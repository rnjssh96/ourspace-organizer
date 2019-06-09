import React from 'react';
import { connect } from 'react-redux';

import RootState from '../redux-types';

import { BusyLevel, interpretBusyLevel } from '../model/space';

import { setBusyLevel } from '../actions/current-space';

interface _ReduxProps {
    /**
     * Busy level of the space
     */
    busyLevel: BusyLevel;
}

interface _ReduxActionCreators {
    /**
     * Set busy level of the space
     */
    setBusyLevel: typeof setBusyLevel;
}

interface OSBusyLevelSelectorProps extends _ReduxProps, _ReduxActionCreators {}

class _OSBusyLevelSelector extends React.Component<OSBusyLevelSelectorProps> {
    private _renderButton = (level: BusyLevel) => (
        <button
            className={`${this.props.busyLevel == level ? 'selected' : ''}`}
            onClick={() => {
                this.props.setBusyLevel(level);
            }}
        >
            <p className="h6">{interpretBusyLevel(level, 'ko')}</p>
        </button>
    );

    render() {
        return (
            <div id="os-busy-level-selector">
                <p className="h3">
                    <b>{interpretBusyLevel(this.props.busyLevel, 'ko')}</b>
                </p>
                <div id="buttons">
                    {this._renderButton('3')}
                    {this._renderButton('2')}
                    {this._renderButton('1')}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    busyLevel:
        (state.currentSpace.data && state.currentSpace.data.busyLevel) || '1',
});

const mapDispatchToProps = {
    setBusyLevel,
};

const OSBusyLevelSelector = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_OSBusyLevelSelector);

export default OSBusyLevelSelector;
