/**
 *
 *
 * SpacePurpose props
 *
 *
 */
interface SpacePurposeProps extends _ReduxProps, _ReduxActionCreators {}

/**
 *
 *
 * SpacePurpose component
 *
 *
 */
import React from 'react';

import OSEditButton from './os-edit-button';

import { Purpose, interpretPurpose, purposes } from '../model/space';

const TAGS_PER_ROW = 3;

class _SpacePurpose extends React.Component<SpacePurposeProps> {
    private editModalID = 'space-purpose-edit-modal';

    public state: { selected: Set<Purpose> } = {
        selected: new Set(),
    };

    private _updateSpacePurpose = () => {
        if (this.props.currentSpaceID) {
            const spacePurpose: number[] = [];
            this.state.selected.forEach((purpose: Purpose) =>
                spacePurpose.push(parseInt(purpose)),
            );
            this.props.updateSpace(this.props.currentSpaceID, 'purpose', {
                purpose: spacePurpose,
            });
        }
    };

    private _setPurposeAsSelected = () => {
        const selectedSet = new Set<Purpose>();
        this.props.spacePurpose.forEach((purpose: Purpose) =>
            selectedSet.add(purpose),
        );
        this.setState({ selected: selectedSet });
    };

    private _onPurposeClicked = (purpose: Purpose) => {
        const set = this.state.selected;
        if (this.state.selected.has(purpose)) {
            set.delete(purpose);
        } else {
            set.add(purpose);
        }
        this.setState({ selected: set });
    };

    private _renderPurposes = () => (
        <div id="tags">
            {this.props.spacePurpose.map((purpose: Purpose) => (
                <p key={purpose} className="h5 tag">
                    {interpretPurpose(purpose, 'ko')}
                </p>
            ))}
        </div>
    );

    private _renderModalBody = () => {
        const numOfTags = Object.keys(purposes).length;
        const numOfRows = Math.ceil(numOfTags / TAGS_PER_ROW);

        let tagsJSX = [];
        let rowsJSX = [];

        for (let purpose in purposes) {
            tagsJSX.push(
                <p
                    key={purpose}
                    className={`h5 tag-radio ${
                        this.state.selected.has(purpose as Purpose)
                            ? 'selected'
                            : ''
                    }`}
                    onClick={() => {
                        this._onPurposeClicked(purpose as Purpose);
                    }}
                >
                    {interpretPurpose(purpose as Purpose, 'ko')}
                </p>,
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
                        <p className="modal-title h5">목적 수정</p>
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
                            onClick={this._updateSpacePurpose}
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
                    <p className="h5">공간 목적</p>
                    <OSEditButton
                        modalID={this.editModalID}
                        onClick={this._setPurposeAsSelected}
                    />
                </div>
                <div className="body">{this._renderPurposes()}</div>
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
     * Space purposes
     */
    spacePurpose: Purpose[];
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
    spacePurpose: state.currentSpace.data
        ? state.currentSpace.data.purposes
        : [],
});

const mapDispatchToProps = { updateSpace };

const SpacePurpose = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_SpacePurpose);

export default SpacePurpose;
