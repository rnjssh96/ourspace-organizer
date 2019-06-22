import React from 'react';

import OSPageStatus from '../components/os-page-status';
import OSRankDisplay from '../components/os-rate-display';
import OSImagesEditor from '../components/images-editor';
import OSAmenityTags from '../components/amenity-tags';
import OSLoactionMap from '../components/loaction-map';
import OSGeneralInfo from '../components/general-info';
import OSSpaceIntroduce from '../components/space-description';

/**
 *
 *
 * HomeMainView props
 *
 *
 */
interface HomeMainViewProps extends _ReduxProps {}

/**
 *
 *
 * HomeMainView component
 *
 *
 */
class _HomeMainView extends React.Component<HomeMainViewProps> {
    render() {
        if (this.props.requestingSpaceStatus.status === 'requesting') {
            return <OSPageStatus status="loading" />;
        } else if (!this.props.currentSpaceID) {
            return (
                <OSPageStatus
                    status="information"
                    info="스페이스를 선택하여 주십시오."
                />
            );
        } else {
            return (
                <div id="home-main-view">
                    <div id="overview">
                        <div id="left">
                            <OSGeneralInfo />
                        </div>
                        <div id="right">
                            <OSRankDisplay />
                            {/* <OSBusyLevelSelector /> */}
                        </div>
                    </div>
                    <div id="body">
                        <div id="left">
                            <OSSpaceIntroduce />
                            <OSAmenityTags />
                            <OSImagesEditor />
                            {/* <OSCommentsViewer /> */}
                        </div>
                        <div id="right">
                            <OSLoactionMap />
                        </div>
                    </div>
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
import RootState from '../redux-types';

import { RequestStatus } from '../model/system';

interface _ReduxProps {
    /**
     * ID of the current space
     */
    currentSpaceID?: string;

    /**
     * Space requesting
     */
    requestingSpaceStatus: RequestStatus;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    currentSpaceID: state.currentSpace.data && state.currentSpace.data.id,
    requestingSpaceStatus: state.currentSpace.requestingStatus,
});

const HomeMainView = connect(mapStateToProps)(_HomeMainView);

export default HomeMainView;
