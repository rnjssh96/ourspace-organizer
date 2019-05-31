import React from 'react';

import OSSeatController from '../components/os-seat-controller';
import OSRateDisplay from '../components/os-rate-display';
import OSImagesEditor from '../components/os-images-editor';
import OSCommentsViewer from '../components/os-comments-viewer';
import OSAmenityTags from '../components/os-amenity-tags';
import OSLoactionMap from '../components/os-loaction-map';

export default class HomeMainView extends React.Component {
    render() {
        return (
            <div id="home-main-view">
                <div id="overview">
                    <div id="left">
                        <img
                            src="./demo-images/about_img_01.jpg"
                            className="rounded"
                        />
                        <div id="general-info">
                            <div id="title-row">
                                <p className="h4 os-text-ellipsis">
                                    스타벅스 자양점
                                </p>
                                <p
                                    id="txt-types"
                                    className="h6 os-grey-1 os-text-ellipsis"
                                >
                                    도서관 | 카페
                                </p>
                            </div>
                            <div className="info-row">
                                <p className="h6 os-grey-1 os-text-ellipsis">
                                    <i className="material-icons">
                                        location_on
                                    </i>
                                    원주 the potato factory
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
                                    <i className="material-icons">
                                        access_time
                                    </i>
                                    00:00 - 24:00 / Mon ~ Sun
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
                    <div id="right">
                        <OSRateDisplay />
                        <OSSeatController />
                    </div>
                </div>
                <div id="body">
                    <div id="left">
                        <OSImagesEditor />
                        <OSCommentsViewer />
                    </div>
                    <div id="right">
                        <OSAmenityTags />
                        <div id="location-map">
                            <OSLoactionMap />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
