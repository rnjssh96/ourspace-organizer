import React from 'react';
import { connect } from 'react-redux';

import RootState from '../redux-types';

import { fetchSpaceFromServer } from '../actions/api-process';
import { FetchSpaceFromServerAction } from '../redux-types/api-process';

import OSLoadingSpinner from '../components/os-loading-spinner';
import OSRankDisplay from '../components/os-rank-display';
import OSImagesEditor from '../components/os-images-editor';
import OSAmenityTags from '../components/os-amenity-tags';
import OSLoactionMap from '../components/os-loaction-map';
import OSGeneralInfo from '../components/os-general-info';
import OSSpaceIntroduce from '../components/os-space-introduce';

interface _ReduxProps {
    /**
     * Space fetching status
     */
    spaceFetching: boolean;
}

interface _ReduxActionCreators {
    /**
     * Fetch space data from server
     */
    fetchSpaceFromServer: FetchSpaceFromServerAction;
}

interface HomeMainViewProps extends _ReduxProps, _ReduxActionCreators {}

class _HomeMainView extends React.Component<HomeMainViewProps> {
    componentWillMount() {
        this.props.fetchSpaceFromServer();
    }

    render() {
        if (this.props.spaceFetching) {
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
    spaceFetching: state.apiProcess.currentSpace.spaceFetching,
});

const mapDispatchToProps = {
    fetchSpaceFromServer,
};

const HomeMainView = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_HomeMainView);

export default HomeMainView;
