import React from 'react';
import { connect } from 'react-redux';

import RootState from '../redux-types';

import { fetchSpaceFromOSDB } from '../actions/api-process';
import { FetchSpaceFromOSDBAction } from '../redux-types/api-process';

import OSLoadingSpinner from '../components/os-loading-spinner';
import OSRankDisplay from '../components/os-rank-display';
import OSImagesEditor from '../components/os-images-editor';
import OSAmenityTags from '../components/os-amenity-tags';
import OSLoactionMap from '../components/os-loaction-map';
import OSGeneralInfo from '../components/os-general-info';
import OSSpaceIntroduce from '../components/os-space-introduce';

interface _ReduxProps {
    /**
     * Space requesting
     */
    requestingSpace: boolean;
}

interface _ReduxActionCreators {
    /**
     * Fetch space data from OSDB
     */
    fetchSpaceFromOSDB: FetchSpaceFromOSDBAction;
}

interface HomeMainViewProps extends _ReduxProps, _ReduxActionCreators {}

class _HomeMainView extends React.Component<HomeMainViewProps> {
    componentWillMount() {
        this.props.fetchSpaceFromOSDB();
    }

    render() {
        if (this.props.requestingSpace) {
            return <OSLoadingSpinner />;
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
    requestingSpace: state.currentSpace.status.requestingSpace,
});

const mapDispatchToProps = {
    fetchSpaceFromOSDB,
};

const HomeMainView = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_HomeMainView);

export default HomeMainView;
