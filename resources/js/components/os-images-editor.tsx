import React from 'react';
import { connect } from 'react-redux';

import RootState from '../redux-types';

interface _ReduxProps {
    images: string[];
}

interface OSImagesEditorProps extends _ReduxProps {}

class _OSImagesEditor extends React.Component<OSImagesEditorProps> {
    private _renderImages() {
        return this.props.images.map((image: string) => (
            <img key={image} src={image} className="rounded" />
        ));
    }

    render() {
        return (
            <div id="os-images-editor">
                <div id="header">
                    <p className="h5">매장사진</p>
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

const mapStateToProps = (state: RootState): _ReduxProps => ({
    images: state.currentSpace.images,
});

const mapDispatchToProps = {};

const OSImagesEditor = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_OSImagesEditor);

export default OSImagesEditor;
