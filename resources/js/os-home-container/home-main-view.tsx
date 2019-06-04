import React from 'react';

import OSRankDisplay from '../components/os-rank-display';
import OSImagesEditor from '../components/os-images-editor';
import OSAmenityTags from '../components/os-amenity-tags';
import OSLoactionMap from '../components/os-loaction-map';
import OSBusyLevelSelector from '../components/os-busy-level-selector';
import OSGeneralInfo from '../components/os-general-info';

export default class HomeMainView extends React.Component {
    render() {
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
