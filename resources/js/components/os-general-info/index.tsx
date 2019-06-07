import React from 'react';
import { connect } from 'react-redux';

import RootState from '../../redux-types';

import { SpaceNames, SpaceType, interpretSpaceType } from '../../model/space';

import { setOperatingHours } from '../../actions/current-space';

import OperatingHourEditModal, {
    OperatingHourEditModalID,
} from './operating-hour-edit-modal';

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
}

interface _ReduxActionCreators {
    /**
     * Set operating hours of the space
     */
    setOperatingHours: typeof setOperatingHours;
}

interface OSGeneralInfoProps extends _ReduxProps, _ReduxActionCreators {}

class _OSGeneralInfo extends React.Component<OSGeneralInfoProps> {
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
                            {this.props.operatingHours &&
                                this.props.operatingHours.map(
                                    (workingHour: string) => (
                                        <p
                                            key={workingHour}
                                            className="h6 os-grey-1 os-text-ellipsis"
                                        >
                                            {workingHour}
                                        </p>
                                    ),
                                )}
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
                        <OperatingHourEditModal
                            setOperatingHours={this.props.setOperatingHours}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    spaceNames: state.currentSpace.data.spaceNames,
    types: state.currentSpace.data.types,
    locationText: state.currentSpace.data.locationText,
    operatingHours: state.currentSpace.data.operatingHours,
});

const mapDispatchToProps = {
    setOperatingHours,
};

const OSGeneralInfo = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_OSGeneralInfo);

export default OSGeneralInfo;
