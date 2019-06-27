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

import { SpaceType, interpretSpaceType } from '../../model/space';

import OperatingHourEditModal, {
    OperatingHourEditModalID,
} from './operating-hour-edit-modal';

import OSEditButton from '../os-edit-button';
import OSRateDisplay from '../os-rate-display';
import OSPageStatus from '../os-page-status';

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
                </div>
                <OSEditButton />
            </div>
        );
    };

    private _renderRate = () => {
        return (
            <div id="rate-row">
                <OSRateDisplay />
            </div>
        );
    };

    private _renderLocationText = () => {
        return (
            <div id="location-row">
                <p id="icon" className="h6">
                    <i className="material-icons">location_on</i>
                </p>
                <p className="h6">
                    {this.props.locationText
                        ? this.props.locationText
                        : '(위치 정보가 없습니다.)'}
                </p>
            </div>
        );
    };

    private _renderOperatingHours = () => {
        let displayTexts;

        if (
            !this.props.operatingHours ||
            this.props.operatingHours.length <= 0
        ) {
            displayTexts = <p className="h6">(운영시간 정보가 없습니다.)</p>;
        } else {
            displayTexts = this.props.operatingHours.map(
                (workingHour: string) => (
                    <p key={workingHour} className="h6">
                        {workingHour}
                    </p>
                ),
            );
        }

        return (
            <div id="operating-hours-row">
                <div id="operating-hours">
                    <p id="icon" className="h6">
                        <i className="material-icons">access_time</i>
                    </p>
                    <div id="value">{displayTexts}</div>
                </div>
                <OSEditButton modalID={OperatingHourEditModalID} />
                <OperatingHourEditModal />
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
            return (
                <div id="general-info">
                    {this._renderTitle()}
                    {this._renderRate()}
                    {this._renderLocationText()}
                    {this._renderOperatingHours()}
                </div>
            );
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
import RootState from '../../redux-types';

import { SpaceNames } from '../../model/space';
import { RequestStatus } from '../../model/system';

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
     * Location address
     */
    locationText?: string;

    /**
     * Operating hours and days
     */
    operatingHours?: string[];

    /**
     * Updating general information status
     */
    updatingGIStatus: RequestStatus;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    spaceNames: state.currentSpace.data && state.currentSpace.data.spaceNames,
    types: state.currentSpace.data && state.currentSpace.data.types,
    locationText:
        state.currentSpace.data && state.currentSpace.data.locationText,
    operatingHours:
        state.currentSpace.data && state.currentSpace.data.operatingHours,
    updatingGIStatus: state.currentSpace.updatingGIStatus,
});

const GeneralInfo = connect(mapStateToProps)(_GeneralInfo);

export default GeneralInfo;
