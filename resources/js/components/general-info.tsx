/**
 *
 *
 * GeneralInfo props
 *
 *
 */
interface GeneralInfoProps extends _ReduxProps {}

/**
 *
 *
 * GeneralInfo component
 *
 *
 */
import React from 'react';

import { SpaceType, interpretSpaceType } from '../model/space';

import OSEditButton from './os-edit-button';
import OSRateDisplay from './os-rate-display';

class _GeneralInfo extends React.Component<GeneralInfoProps> {
    private _renderTitle = () => {
        const typeText = this.props.type
            ? interpretSpaceType(this.props.type, 'ko')
            : '(카테고리)';

        return (
            <div id="space-name-row">
                <div id="space-name">
                    <p className="h2">
                        {this.props.spaceNames
                            ? this.props.spaceNames['ko']
                            : '(매장이름)'}
                    </p>
                    <p id="type" className="h4">
                        {typeText}
                    </p>
                    <OSEditButton />
                </div>
                <div id="rate">
                    <OSRateDisplay />
                </div>
            </div>
        );
    };

    render() {
        return <div id="general-info">{this._renderTitle()}</div>;
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

import { SpaceNames } from '../model/space';

interface _ReduxProps {
    /**
     * Names of the space
     */
    spaceNames?: SpaceNames;

    /**
     * Types of the space
     */
    type?: SpaceType;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    spaceNames: state.currentSpace.data && state.currentSpace.data.spaceNames,
    type: state.currentSpace.data && state.currentSpace.data.spaceType,
});

const GeneralInfo = connect(mapStateToProps)(_GeneralInfo);

export default GeneralInfo;
