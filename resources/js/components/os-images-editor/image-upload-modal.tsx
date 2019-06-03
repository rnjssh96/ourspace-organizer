import React from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import ContentLoader from 'react-content-loader';
import filesize from 'filesize';

import AllowedFileMime from '../../config/allowed-file-mime.json';

import RootState from '../../redux-types';
import {
    UploadImagesMap,
    UploadImage,
} from '../../redux-types/upload-images.js';

import {
    addUploadImage,
    updateUploadProgress,
    setImageData,
    deleteUploadImage,
} from '../../actions/upload-images';

export const ImageUploadModalID = 'image-upload-modal';

// Allowed uploading file formats and mimes
const ALLOWED_FILE_FORMATS = Object.keys(AllowedFileMime.image);
const ALLOWED_FILE_MIMES = Object.values(AllowedFileMime.image);

interface _ReduxProps {
    /**
     * Total number of selected images
     */
    imagesCount: number;

    /**
     * Upload images array
     */
    uploadImages: UploadImagesMap;
}

interface _ReduxActionCreators {
    /**
     * Add upload image
     */
    addUploadImage: typeof addUploadImage;

    /**
     * Update upload progress
     */
    updateUploadProgress: typeof updateUploadProgress;

    /**
     * Set uploaded image data
     */
    setImageData: typeof setImageData;

    /**
     * Delete uploaded image
     */
    deleteUploadImage: typeof deleteUploadImage;
}

interface ImageUploadModalProps extends _ReduxProps, _ReduxActionCreators {}

class _ImageUploadModal extends React.Component<ImageUploadModalProps> {
    private _onFileDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach((file: File) => {
            if (ALLOWED_FILE_MIMES.indexOf(file.type) != -1) {
                const imageKey: number = Date.now();
                this.props.addUploadImage(imageKey, {
                    key: imageKey,
                    name: file.name,
                    size: file.size,
                    progress: 0,
                });

                const reader = new FileReader();

                reader.onprogress = (ev: ProgressEvent) => {
                    if (ev.lengthComputable) {
                        this.props.updateUploadProgress(
                            imageKey,
                            Math.floor((ev.loaded / ev.total) * 100),
                        );
                    }
                };
                reader.onload = () => {
                    if (
                        reader.result !== null &&
                        typeof reader.result == 'string'
                    ) {
                        this.props.setImageData(imageKey, reader.result);
                    }
                };
                reader.readAsDataURL(file);
            } else {
                alert(`"${file.name}": 허용되지 않는 파일형식입니다.`);
            }
        });
    };

    private _renderSelectedImages = () => {
        const placeholder = (
            <ContentLoader
                width={90}
                height={90}
                speed={2}
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
            >
                <rect x="5" y="5" rx="10" ry="10" width="80" height="80" />
            </ContentLoader>
        );

        return Object.values(this.props.uploadImages).map(
            (image: UploadImage) => (
                <div key={image.key} className="upload-image-row">
                    <div className="upload-image">
                        {image.dataURL ? (
                            <img src={image.dataURL} />
                        ) : (
                            placeholder
                        )}
                    </div>
                    <div className="upload-image-content">
                        <p className="image-name h5">{image.name}</p>
                        <p className="image-size h6">{filesize(image.size)}</p>
                        <div className="progress">
                            <div
                                className={`progress-bar ${
                                    image.dataURL ? 'bg-success' : 'bg-primary'
                                }`}
                                role="progressbar"
                                style={{ width: `${image.progress}%` }}
                            >
                                {`${image.dataURL ? '완료!' : '업로드 중...'}`}
                            </div>
                        </div>
                    </div>
                    <button
                        className="delete-image-button"
                        type="button"
                        onClick={() => {
                            this.props.deleteUploadImage(image.key);
                        }}
                    >
                        <i className="material-icons">cancel</i>
                    </button>
                </div>
            ),
        );
    };

    private _renderDropzone = () => (
        <Dropzone onDrop={this._onFileDrop}>
            {({ getRootProps, getInputProps }) => (
                <div id="image-uploader">
                    {this.props.imagesCount > 0 && (
                        <div id="upload-images">
                            {this._renderSelectedImages()}
                        </div>
                    )}
                    <section id="image-drop-area">
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div id="uploading-info">
                                <p id="upload-icon">
                                    <i className="material-icons">
                                        move_to_inbox
                                    </i>
                                </p>
                                <p className="h5">
                                    이곳을 클릭해 파일을 추가하거나 업로드할
                                    파일을 이곳으로 끌어다 놓으세요.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </Dropzone>
    );

    render() {
        return (
            <div
                id={ImageUploadModalID}
                className="modal fade"
                tabIndex={-1}
                role="dialog"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title h5">사진 업로드</p>
                        </div>
                        <div className="modal-body">
                            {this._renderDropzone()}
                            <p className="h6">
                                <i className="material-icons">info</i>
                                업로드 가능한 파일형식:
                                {ALLOWED_FILE_FORMATS.map(
                                    (format: string) => ` ${format}`,
                                )}
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                닫기
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                data-dismiss="modal"
                            >
                                업로드
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    imagesCount: state.selectedImages.imagesCount,
    uploadImages: state.selectedImages.uploadImages,
});

const mapDispatchToProps = {
    addUploadImage,
    updateUploadProgress,
    setImageData,
    deleteUploadImage,
};

const ImageUploadModal = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_ImageUploadModal);

export default ImageUploadModal;
