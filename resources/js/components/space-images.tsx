/**
 *
 *
 * SpaceImages props
 *
 *
 */
interface SpaceImagesProps extends _ReduxProps, _ReduxActionCreators {}

/**
 *
 *
 * SpaceImages component
 *
 *
 */
import React, { ChangeEvent } from 'react';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from 'react-beautiful-dnd';

import OSPageStatus from './os-page-status';
import OSEditButton from './os-edit-button';

type Mode = 'display' | 'edit';

class _SpaceImages extends React.Component<SpaceImagesProps> {
    public state: { mode: Mode; editingImages: SpaceImage[] } = {
        mode: 'display',
        editingImages: [],
    };

    private _updateImages = () =>
        this.props.currentSpaceID &&
        this.props.updateSpace(this.props.currentSpaceID, 'images', {
            images: this.state.editingImages,
        });

    private _swtichMode = (m: Mode) => {
        this.setState({ mode: m, editingImages: this.props.images });
    };

    private _onDragEnd(result: DropResult) {
        if (result.destination) {
            const newList = this.state.editingImages;
            const [removed] = newList.splice(result.source.index, 1);
            newList.splice(result.destination.index, 0, removed);

            this.setState({
                ...this.state,
                editingImages: newList,
            });
        }
    }

    private _writeOwner = (index: number, owner: string) => {
        const images = this.state.editingImages;
        images[index].owner = owner;
        this.setState({
            ...this.state,
            editingImages: images,
        });
    };

    private _renderEditableImagesList = () => (
        <DragDropContext onDragEnd={this._onDragEnd.bind(this)}>
            {console.log(this.state.editingImages)}
            <Droppable droppableId="droppable">
                {provided => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {this.state.editingImages.map(
                            (image: SpaceImage, idx: number) => (
                                <Draggable
                                    index={idx}
                                    key={image.uid}
                                    draggableId={image.uid}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            className={`img-item ${
                                                snapshot.isDragging
                                                    ? 'dragging'
                                                    : ''
                                            }`}
                                            style={
                                                provided.draggableProps.style
                                            }
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <img
                                                src={image.low}
                                                className="rounded"
                                            />
                                            <div className="source-input">
                                                <p>Source</p>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Username"
                                                    value={image.owner}
                                                    onChange={(
                                                        event: ChangeEvent<
                                                            HTMLInputElement
                                                        >,
                                                    ) => {
                                                        this._writeOwner(
                                                            idx,
                                                            event.target.value,
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ),
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );

    private _renderImages = () => {
        if (this.props.imagesStatus.status === 'processing') {
            return <OSPageStatus status="loading" />;
        } else if (this.props.images.length === 0) {
            return (
                <div id="empty">
                    <p className="h6">등록된 사진이 없습니다.</p>
                </div>
            );
        } else {
            return this.state.mode === 'display'
                ? this.props.images.map((image: SpaceImage) => (
                      <div key={image.uid} className="img-item">
                          <img src={image.low} className="rounded" />
                          <p className="h5">{image.owner}</p>
                      </div>
                  ))
                : this._renderEditableImagesList();
        }
    };

    render() {
        return (
            <div id="space-images">
                <div id="header">
                    <div id="title">
                        <p className="h4">사진</p>
                        <span className="h4 badge badge-pill badge-secondary">
                            {this.props.images.length}
                        </span>
                    </div>
                    {this.state.mode === 'display' && (
                        <OSEditButton
                            onClick={() => {
                                this._swtichMode('edit');
                            }}
                        />
                    )}
                </div>
                <div id="body">{this._renderImages()}</div>
                {this.state.mode === 'edit' && (
                    <div id="footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                            onClick={() => {
                                this._swtichMode('display');
                            }}
                        >
                            취소
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-dismiss="modal"
                            onClick={() => {
                                this._updateImages();
                                this._swtichMode('display');
                            }}
                        >
                            저장
                        </button>
                    </div>
                )}
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
import RootState from '../redux-types';

import {
    SpaceImage,
    SpaceID,
    SpaceRequestUnit,
    SpaceUpdate,
} from '../model/space';
import { DataStatus } from '../model/system';

import { updateSpace } from '../thunk-action/current-space';

interface _ReduxProps {
    /**
     * Current space ID
     */
    currentSpaceID?: SpaceID;

    /**
     * Images of the space
     */
    images: SpaceImage[];

    /**
     * images data status
     */
    imagesStatus: DataStatus;
}

interface _ReduxActionCreators {
    /**
     * Update space data on the server
     */
    updateSpace: (
        spaceID: SpaceID,
        requestUnit: SpaceRequestUnit,
        spaceUpdate: SpaceUpdate,
    ) => void;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    currentSpaceID: state.currentSpace.data && state.currentSpace.data.id,
    images: state.currentSpace.data ? state.currentSpace.data.images : [],
    imagesStatus: state.currentSpace.imagesStatus,
});

const mapDispatchToProps = { updateSpace };

const SpaceImages = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_SpaceImages);

export default SpaceImages;
