import React from 'react';

export default class HomeSpacesTab extends React.Component {
    private _renderSpace() {
        return (
            <a className="space-item">
                <img src="./demo-images/about_img_01.jpg" className="rounded" />
                <div className="space-item-body">
                    <p className="h5">스타벅스 자양점</p>
                    <p className="h6 os-grey-1">
                        서울 송파구 올림픽로 35길 104
                    </p>
                </div>
            </a>
        );
    }

    render() {
        return (
            <div id="home-spaces-tab">
                {this._renderSpace()}
                {this._renderSpace()}
            </div>
        );
    }
}
