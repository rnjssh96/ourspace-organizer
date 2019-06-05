import React from 'react';
import { connect } from 'react-redux';

import RootState from '../../redux-types';

import ImageUploadModal, { ImageUploadModalID } from './image-upload-modal';

import { resetUploadImages } from '../../actions/upload-images';

interface _ReduxProps {
    /**
     * Images of the space
     */
    images: string[];
}

interface _ReduxActionCreators {
    /**
     * Reset upload images
     */
    resetUploadImages: typeof resetUploadImages;
}

interface OSImagesEditorProps extends _ReduxProps, _ReduxActionCreators {}

class _OSImagesEditor extends React.Component<OSImagesEditorProps> {
    private _resetUploadImages = () => {
        this.props.resetUploadImages();
    };

    private _renderImages() {
        return this.props.images.map((image: string) => (
            <img key={image} src={image} className="rounded" />
        ));
    }

    render() {
        return (
            <div id="os-images-editor">
                <div className="header">
                    <p className="h5">매장사진</p>
                    <button
                        data-toggle="modal"
                        data-target={`#${ImageUploadModalID}`}
                        onClick={this._resetUploadImages}
                    >
                        <p className="h6 os-grey-1">
                            <i className="material-icons">add</i>
                            추가
                        </p>
                    </button>
                    <ImageUploadModal />
                </div>
                <div className="body">{this._renderImages()}</div>
                <div className="footer">
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
    images: state.currentSpace.data.images,
});

const mapDispatchToProps = {
    resetUploadImages,
};

const OSImagesEditor = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_OSImagesEditor);

export default OSImagesEditor;
