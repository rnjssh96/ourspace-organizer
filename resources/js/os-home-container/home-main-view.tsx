import React from 'react';
import { connect } from 'react-redux';

import RootState from '../redux-types';

import { fetchSpace } from '../actions/osdb-api';
import { FetchSpaceAction } from '../redux-types/osdb-api';

import OSPageStatus from '../components/os-page-status';
import OSRankDisplay from '../components/os-rank-display';
import OSImagesEditor from '../components/os-images-editor';
import OSAmenityTags from '../components/os-amenity-tags';
import OSLoactionMap from '../components/os-loaction-map';
import OSGeneralInfo from '../components/os-general-info';
import OSSpaceIntroduce from '../components/os-space-introduce';

interface _ReduxProps {
    /**
     * ID of the current space
     */
    currentSpaceID?: string;

    /**
     * Space requesting
     */
    requestingSpace: boolean;
}

interface _ReduxActionCreators {
    /**
     * Fetch space from OSDB
     */
    fetchSpace: FetchSpaceAction;
}

interface HomeMainViewProps extends _ReduxProps, _ReduxActionCreators {}

class _HomeMainView extends React.Component<HomeMainViewProps> {
    render() {
        if (this.props.requestingSpace) {
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

const mapStateToProps = (state: RootState): _ReduxProps => ({
    currentSpaceID: state.currentSpace.data && state.currentSpace.data.id,
    requestingSpace: state.currentSpace.status.requestingSpace,
});

const mapDispatchToProps = {
    fetchSpace,
};

const HomeMainView = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_HomeMainView);

export default HomeMainView;
