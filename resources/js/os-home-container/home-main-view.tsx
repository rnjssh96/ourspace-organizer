import React from 'react';

import OSSeatController from '../components/os-seat-controller';
import OSRateDisplay from '../components/os-rate-display';
import OSImagesEditor from '../components/os-images-editor';

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
                                <p className="h4">스타벅스 자양점</p>
                                <p id="txt-types" className="h6 os-grey-1">
                                    도서관 | 카페
                                </p>
                            </div>
                            <div className="info-row">
                                <p className="h6 os-grey-1">
                                    원주 the potato factory
                                </p>
                                <a>
                                    <p className="h6 os-grey-1">수정</p>
                                </a>
                            </div>
                            <div className="info-row">
                                <p className="h6 os-grey-1">
                                    00:00 - 24:00 / Mon ~ Sun
                                </p>
                                <a>
                                    <p className="h6 os-grey-1">수정</p>
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
                    </div>
                    <div id="right" />
                </div>
            </div>
        );
    }
}
