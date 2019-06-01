import React from 'react';
import { connect } from 'react-redux';

import RootState from '../redux-types';

import { SpaceNames, SpaceType, interpretSpaceType } from '../model/space';

interface _ReduxProps {
    /**
     * Names of the space
     */
    spaceNames: SpaceNames;

    /**
     * Types of the space
     */
    types: SpaceType[];

    /**
     * Location address
     */
    locationText: string;

    /**
     * Operating hours and days
     */
    operatingHours: string;
}

interface OSGeneralInfoProps extends _ReduxProps {}

class _OSGeneralInfo extends React.Component<OSGeneralInfoProps> {
    render() {
        let typesText: string = '';
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
                            {this.props.spaceNames['ko']}
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
                            {this.props.locationText}
                        </p>
                        <a>
                            <p className="h6 os-grey-1">
                                <i className="material-icons">edit</i>
                                수정
                            </p>
                        </a>
                    </div>
                    <div className="info-row">
                        <p className="h6 os-grey-1 os-text-ellipsis">
                            <i className="material-icons">access_time</i>
                            {this.props.operatingHours}
                        </p>
                        <a>
                            <p className="h6 os-grey-1">
                                <i className="material-icons">edit</i>
                                수정
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    spaceNames: state.currentSpace.spaceNames,
    types: state.currentSpace.types,
    locationText: state.currentSpace.locationText,
    operatingHours: state.currentSpace.operatingHours,
});

const mapDispatchToProps = {};

const OSGeneralInfo = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_OSGeneralInfo);

export default OSGeneralInfo;
