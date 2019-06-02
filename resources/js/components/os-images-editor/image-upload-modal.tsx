import React from 'react';
import { connect } from 'react-redux';

import RootState from '../../redux-types';

export const ImageUploadModalID = 'image-upload-modal';

interface _ReduxProps {}

interface ImageUploadModalProps extends _ReduxProps {}

class _ImageUploadModal extends React.Component<ImageUploadModalProps> {
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
                    <form>
                        <div className="modal-content">
                            <div className="modal-header">
                                <p className="modal-title h5">사진 업로드</p>
                            </div>
                            <div className="modal-body" />
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
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): _ReduxProps => ({});

const mapDispatchToProps = {};

const ImageUploadModal = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_ImageUploadModal);

export default ImageUploadModal;
