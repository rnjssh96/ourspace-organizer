/**
 *
 *
 * ImagesEditor props
 *
 *
 */
interface ImagesEditorProps extends _ReduxProps, _ReduxActionCreators {}

/**
 *
 *
 * ImagesEditor component
 *
 *
 */
import React from 'react';

import ImageUploadModal, { ImageUploadModalID } from './image-upload-modal';

import OSPageStatus from '../os-page-status';
import OSEditButton from '../os-edit-button';

class _ImagesEditor extends React.Component<ImagesEditorProps> {
    private _resetUploadImages = () => {
        this.props.resetUploadImages();
    };

    private _renderImages() {
        if (this.props.updatingImagesStatus.status === 'requesting') {
            return <OSPageStatus status="loading" />;
        } else if (!this.props.images || this.props.images.length === 0) {
            return (
                <div id="empty">
                    <p className="h6">등록된 사진이 없습니다.</p>
                </div>
            );
        } else {
            return this.props.images.map((image: SpaceImage, idx: number) => (
                <div key={idx} className="img-item">
                    <img src={image.low} className="rounded" />
                    <p className="h5">{image.owner}</p>
                </div>
            ));
        }
    }

    render() {
        return (
            <div id="images-editor">
                <div id="header">
                    <div id="title">
                        <p className="h4">사진</p>
                        <span className="h4 badge badge-pill badge-secondary">
                            {this.props.images ? this.props.images.length : 0}
                        </span>
                    </div>
                    <OSEditButton
                        modalID={ImageUploadModalID}
                        onClick={this._resetUploadImages}
                    />
                </div>
                <div id="body">{this._renderImages()}</div>
                <div id="footer">
                    <p className="h6">
                        <i className="material-icons">info</i>
                        사진 삭제 기능은 추후에 업데이트될 예정입니다.
                    </p>
                </div>
                <ImageUploadModal />
            </div>
        );
    }
}

/**
 *
 *
 * Connect redux
 *
 *
 */
import { connect } from 'react-redux';
import RootState from '../../redux-types';

import { SpaceImage } from '../../model/space';
import { RequestStatus } from '../../model/system';

import { resetUploadImages } from '../../actions/upload-images';

interface _ReduxProps {
    /**
     * Images of the space
     */
    images?: SpaceImage[];

    /**
     * Updating image status
     */
    updatingImagesStatus: RequestStatus;
}

interface _ReduxActionCreators {
    /**
     * Reset upload image
     */
    resetUploadImages: typeof resetUploadImages;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    images: state.currentSpace.data && state.currentSpace.data.images,
    updatingImagesStatus: state.currentSpace.updatingImagesStatus,
});

const mapDispatchToProps = {
    resetUploadImages,
};

const ImagesEditor = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_ImagesEditor);

export default ImagesEditor;
