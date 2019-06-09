import React from 'react';
import { connect } from 'react-redux';

import RootState from '../../redux-types';

import { SpaceNames, SpaceType, interpretSpaceType } from '../../model/space';

import OperatingHourEditModal, {
    OperatingHourEditModalID,
} from './operating-hour-edit-modal';

import { UpdateOperatingHourAction } from '../../redux-types/osdb-api';

import { updateOperatingHour } from '../../actions/osdb-api';

interface _ReduxProps {
    /**
     * ID of the space
     */
    spaceID?: string;

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
     * Updating operating hour
     */
    updatingOperatingHour: boolean;
}

interface _ReduxActionCreators {
    /**
     * Update operating hours of the space
     */
    updateOperatingHour: UpdateOperatingHourAction;
}

interface OSGeneralInfoProps extends _ReduxProps, _ReduxActionCreators {}

class _OSGeneralInfo extends React.Component<OSGeneralInfoProps> {
    private _renderOperatingHours = () => {
        if (this.props.updatingOperatingHour) {
            return (
                <p className="h6 os-grey-1 os-text-ellipsis">
                    (업데이트 중...)
                </p>
            );
        } else if (
            !this.props.operatingHours ||
            this.props.operatingHours.length <= 0
        ) {
            return (
                <p className="h6 os-grey-1 os-text-ellipsis">
                    (운영시간 정보가 없습니다.)
                </p>
            );
        } else {
            return this.props.operatingHours.map((workingHour: string) => (
                <p key={workingHour} className="h6 os-grey-1 os-text-ellipsis">
                    {workingHour}
                </p>
            ));
        }
    };

    render() {
        let typesText: string = '';
        if (this.props.types)
            this.props.types.map((type: SpaceType, index: number) => {
                if (index > 0) {
                    typesText += ' | ';
                }
                typesText += interpretSpaceType(type, 'ko');
            });

        return (
            <div id="os-general-info">
                <img src="./demo-images/about_img_01.jpg" className="rounded" />
                <div id="general-info">
                    <div id="title-row">
                        <p className="h4 os-text-ellipsis">
                            {this.props.spaceNames &&
                                this.props.spaceNames['ko']}
                        </p>
                        <p
                            id="txt-types"
                            className="h6 os-grey-1 os-text-ellipsis"
                        >
                            {typesText}
                        </p>
                    </div>
                    <div className="info-row">
                        <p className="h6 os-grey-1 os-text-ellipsis">
                            <i className="material-icons">location_on</i>
                        </p>
                        <div className="text">
                            <p className="h6 os-grey-1 os-text-ellipsis">
                                {this.props.locationText}
                            </p>
                        </div>
                        {/* <button
                            data-toggle="modal"
                            data-target={`#${LocationEditModalID}`}
                        >
                            <p className="h6 os-grey-1">
                                <i className="material-icons">edit</i>
                                수정
                            </p>
                        </button>
                        <LocationEditModal /> */}
                    </div>
                    <div className="info-row">
                        <p className="h6 os-grey-1 os-text-ellipsis">
                            <i className="material-icons">access_time</i>
                        </p>
                        <div className="text">
                            {this._renderOperatingHours()}
                        </div>
                        <button
                            data-toggle="modal"
                            data-target={`#${OperatingHourEditModalID}`}
                        >
                            <p className="h6 os-grey-1">
                                <i className="material-icons">edit</i>
                                수정
                            </p>
                        </button>
                        {this.props.spaceID && (
                            <OperatingHourEditModal
                                updateOperatingHour={(
                                    operatingHours: string[],
                                ) => {
                                    this.props.updateOperatingHour(
                                        this.props.spaceID!,
                                        operatingHours,
                                    );
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    spaceID: state.currentSpace.data && state.currentSpace.data.id,
    spaceNames: state.currentSpace.data && state.currentSpace.data.spaceNames,
    types: state.currentSpace.data && state.currentSpace.data.types,
    locationText:
        state.currentSpace.data && state.currentSpace.data.locationText,
    operatingHours:
        state.currentSpace.data && state.currentSpace.data.operatingHours,
    updatingOperatingHour: state.currentSpace.status.updatingOperatingHour,
});

const mapDispatchToProps = {
    updateOperatingHour,
};

const OSGeneralInfo = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_OSGeneralInfo);

export default OSGeneralInfo;
