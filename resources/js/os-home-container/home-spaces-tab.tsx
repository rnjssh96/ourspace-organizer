import React from 'react';

export default class HomeSpacesTab extends React.Component {
    private _renderSpace(selcted = false) {
        return (
            <a className={`space-item ${selcted ? 'selected' : ''}`}>
                <img src="./demo-images/about_img_01.jpg" className="rounded" />
                <div className="space-item-body">
                    <p className="h5 os-text-ellipsis">스타벅스 자양점</p>
                    <p className="h6 os-grey-1">
                        <i className="material-icons">location_on</i>
                        서울 송파구 올림픽로 35길 104
                    </p>
                </div>
            </a>
        );
    }

    render() {
        return (
            <div id="home-spaces-tab">
                {this._renderSpace(true)}
                {this._renderSpace()}
            </div>
        );
    }
}
