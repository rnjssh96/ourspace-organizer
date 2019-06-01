import React from 'react';

export default class OSGeneralInfo extends React.Component {
    render() {
        return (
            <div id="os-general-info">
                <img src="./demo-images/about_img_01.jpg" className="rounded" />
                <div id="general-info">
                    <div id="title-row">
                        <p className="h4 os-text-ellipsis">스타벅스 자양점</p>
                        <p
                            id="txt-types"
                            className="h6 os-grey-1 os-text-ellipsis"
                        >
                            도서관 | 카페
                        </p>
                    </div>
                    <div className="info-row">
                        <p className="h6 os-grey-1 os-text-ellipsis">
                            <i className="material-icons">location_on</i>
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
                            <i className="material-icons">access_time</i>
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
        );
    }
}
