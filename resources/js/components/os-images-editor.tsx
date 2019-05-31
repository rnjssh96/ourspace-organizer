import React from 'react';

const IMAGES = [
    './demo-images/about_img_03.jpg',
    './demo-images/item_image_05b.jpg',
    './demo-images/item_image_06.jpg',
];

export default class OSImagesEditor extends React.Component {
    private _renderImages() {
        return IMAGES.map((image: string) => (
            <img key={image} src={image} className="rounded" />
        ));
    }

    render() {
        return (
            <div id="os-images-editor">
                <div id="header">
                    <a>
                        <p className="h6 os-grey-1">
                            <i className="material-icons">add</i>
                            추가
                        </p>
                    </a>
                </div>
                <div id="body">{this._renderImages()}</div>
                <div id="footer">
                    <p className="h6 os-grey-1">
                        <i className="material-icons">info</i>
                        사진 삭제는 Super-organizer 사용자만 가능합니다.
                    </p>
                </div>
            </div>
        );
    }
}
