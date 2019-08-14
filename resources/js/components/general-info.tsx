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
import OSPageStatus from './os-page-status';

class _GeneralInfo extends React.Component<GeneralInfoProps> {
    private _renderTitle = () => {
        let typesText: string = '';
        if (this.props.types)
            this.props.types.map((type: SpaceType, index: number) => {
                if (index > 0) {
                    typesText += ' | ';
                }
                typesText += interpretSpaceType(type, 'ko');
            });

        return (
            <div id="space-name-row">
                <div id="space-name">
                    <p className="h2">
                        {this.props.spaceNames
                            ? this.props.spaceNames['ko']
                            : '(매장이름)'}
                    </p>
                    <p id="type" className="h4">
                        {typesText !== '' ? typesText : '(카테고리)'}
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
        if (this.props.updatingGIStatus.status === 'requesting') {
            return (
                <div id="general-info">
                    <OSPageStatus status="loading" />
                </div>
            );
        } else {
            return <div id="general-info">{this._renderTitle()}</div>;
        }
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
import { RequestStatus } from '../model/system';

interface _ReduxProps {
    /**
     * Names of the space
     */
    spaceNames?: SpaceNames;

    /**
     * Types of the space
     */
    types?: SpaceType[];

    /**
     * Updating general information status
     */
    updatingGIStatus: RequestStatus;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    spaceNames: state.currentSpace.data && state.currentSpace.data.spaceNames,
    types: state.currentSpace.data && state.currentSpace.data.types,
    updatingGIStatus: state.currentSpace.updatingGIStatus,
});

const GeneralInfo = connect(mapStateToProps)(_GeneralInfo);

export default GeneralInfo;
