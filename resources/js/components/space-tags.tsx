/**
 *
 *
 * SpaceTags props
 *
 *
 */
interface SpaceTagsProps extends _ReduxProps, _ReduxActionCreators {}

/**
 *
 *
 * SpaceTags component
 *
 *
 */
import React from 'react';

import OSEditButton from './os-edit-button';

import { SpaceTag, interpretSpaceTag, spaceTags } from '../model/space';

const TAGS_PER_ROW = 3;

class _SpaceTags extends React.Component<SpaceTagsProps> {
    private editModalID = 'space-tags-edit-modal';

    public state: { selected: Set<SpaceTag> } = {
        selected: new Set(),
    };

    private _updateSpaceTags = () => {
        if (this.props.currentSpaceID) {
            const tags: string[] = [];
            this.state.selected.forEach((tag: SpaceTag) => tags.push(tag));
            this.props.updateSpace(this.props.currentSpaceID, 'tags', {
                spaceTags: tags,
            });
        }
    };

    private _setTagsAsSelected = () => {
        const selectedSet = new Set<SpaceTag>();
        this.props.spaceTags.forEach((tag: SpaceTag) => selectedSet.add(tag));
        this.setState({ selected: selectedSet });
    };

    private _renderTags = () => (
        <div id="tags">
            {this.props.spaceTags.map((tag: SpaceTag) => (
                <p key={tag} className="h5 tag">
                    {`#${interpretSpaceTag(tag, 'ko')}`}
                </p>
            ))}
        </div>
    );

    private _onTagClicked = (tag: SpaceTag) => {
        const set = this.state.selected;
        if (this.state.selected.has(tag)) {
            set.delete(tag);
        } else {
            set.add(tag);
        }
        this.setState({ selected: set });
    };

    private _renderModalBody = () => {
        const numOfTags = Object.keys(spaceTags).length;
        const numOfRows = Math.ceil(numOfTags / TAGS_PER_ROW);

        let tagsJSX = [];
        let rowsJSX = [];

        for (let tag in spaceTags) {
            tagsJSX.push(
                <p
                    key={tag}
                    className={`h5 tag-radio ${
                        this.state.selected.has(tag as SpaceTag)
                            ? 'selected'
                            : ''
                    }`}
                    onClick={() => {
                        this._onTagClicked(tag as SpaceTag);
                    }}
                >{`#${interpretSpaceTag(tag as SpaceTag, 'ko')}`}</p>,
            );
        }

        for (let i = 0; i < numOfRows; i++) {
            rowsJSX.push(
                <div key={i} className="tagsRow">
                    {tagsJSX[i * TAGS_PER_ROW + 0]}
                    {tagsJSX[i * TAGS_PER_ROW + 1]}
                    {tagsJSX[i * TAGS_PER_ROW + 2]}
                </div>,
            );
        }

        return <div className="modal-body">{rowsJSX}</div>;
    };

    private _renderEditModal = () => (
        <div
            id={this.editModalID}
            className="modal fade"
            tabIndex={-1}
            role="dialog"
            aria-hidden="true"
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="modal-title h5">태그 수정</p>
                    </div>
                    {this._renderModalBody()}
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                        >
                            닫기
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-dismiss="modal"
                            onClick={this._updateSpaceTags}
                        >
                            저장
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    render() {
        return (
            <div id="space-tags" className="category">
                <div className="header">
                    <p className="h5">태그</p>
                    <OSEditButton
                        modalID={this.editModalID}
                        onClick={this._setTagsAsSelected}
                    />
                </div>
                <div className="body">{this._renderTags()}</div>
                {this._renderEditModal()}
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

import { SpaceID, SpaceRequestUnit, SpaceUpdate } from '../model/space';

import { updateSpace } from '../thunk-action/current-space';

interface _ReduxProps {
    /**
     * Current space ID
     */
    currentSpaceID?: SpaceID;

    /**
     * Space Tags
     */
    spaceTags: SpaceTag[];
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
    spaceTags: state.currentSpace.data ? state.currentSpace.data.tags : [],
});

const mapDispatchToProps = { updateSpace };

const SpaceTags = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_SpaceTags);

export default SpaceTags;
