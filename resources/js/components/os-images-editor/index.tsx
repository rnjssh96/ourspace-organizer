import React from 'react';

import ImageUploadModal, { ImageUploadModalID } from './image-upload-modal';
import OSPageStatus from '../os-page-status';

/**
 *
 *
 * OSImagesEditor props
 *
 *
 */
interface OSImagesEditorProps extends _ReduxProps {}

/**
 *
 *
 * OSImagesEditor component
 *
 *
 */
class _OSImagesEditor extends React.Component<OSImagesEditorProps> {
    private _renderEmpty = () => {
        return (
            <div id="empty">
                <p className="h6">등록된 사진이 없습니다.</p>
            </div>
        );
    };

    private _renderImages() {
        if (this.props.updatingImagesStatus) {
            return <OSPageStatus status="loading" />;
        } else if (this.props.images && this.props.images.length > 0) {
            return this.props.images.map((image: string) => (
                <img key={image} src={image} className="rounded" />
            ));
        } else {
            return this._renderEmpty();
        }
    }

    render() {
        return (
            <div id="os-images-editor">
                <div className="header">
                    <p className="h5">사진</p>
                    <button
                        data-toggle="modal"
                        data-target={`#${ImageUploadModalID}`}
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
                        사진 삭제 기능은 추후에 업데이트될 예정입니다.
                    </p>
                </div>
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

import { RequestStatus } from '../../model/system';

interface _ReduxProps {
    /**
     * Images of the space
     */
    images?: string[];

    /**
     * Updating image status
     */
    updatingImagesStatus: RequestStatus;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    updatingImagesStatus: state.currentSpace.updatingImagesStatus,
    images: state.currentSpace.data && state.currentSpace.data.images,
});

const OSImagesEditor = connect(mapStateToProps)(_OSImagesEditor);

export default OSImagesEditor;
