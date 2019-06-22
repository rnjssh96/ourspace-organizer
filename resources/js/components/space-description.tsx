/**
 *
 *
 * SpaceDescription props
 *
 *
 */
interface SpaceDescriptionProps extends _ReduxProps, _ReduxActionCreators {}

/**
 *
 *
 * SpaceDescription component
 *
 *
 */
import React from 'react';

import OSEditButton from './os-edit-button';

type Mode = 'display' | 'edit';

class _SpaceDescription extends React.Component<SpaceDescriptionProps> {
    public state: { mode: Mode; textValue: string } = {
        mode: 'display',
        textValue: '',
    };

    private _swtichMode = (m: Mode) => {
        this.setState({ mode: m, textValue: this.props.spaceDescription });
    };

    private _onTextChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            ...this.state,
            textValue: ev.target.value,
        });
    };

    private _save = () => {
        this.props.updateSpaceDescription(this.state.textValue);
        this._swtichMode('display');
    };

    private _renderDisplayMode = () =>
        this.props.spaceDescription ? (
            <p id="description-text" className="h6">
                {this.props.spaceDescription}
            </p>
        ) : (
            <p id="no-intro" className="h6">
                등록된 소개글이 없습니다.
            </p>
        );

    private _renderEditMode = () => (
        <div id="editor">
            <textarea
                className="form-control"
                rows={5}
                value={this.state.textValue}
                onChange={this._onTextChange}
            />
            <div id="buttons">
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                        this._swtichMode('display');
                    }}
                >
                    취소
                </button>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                        this._save();
                    }}
                >
                    저장
                </button>
            </div>
        </div>
    );

    render() {
        return (
            <div id="space-description" className="category">
                <div className="header">
                    <p className="h5">소개</p>
                    {this.state.mode === 'display' && (
                        <OSEditButton
                            onClick={() => {
                                this._swtichMode('edit');
                            }}
                        />
                    )}
                </div>
                <div id="description" className="body">
                    {this.state.mode === 'display'
                        ? this._renderDisplayMode()
                        : this._renderEditMode()}
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
import RootState from '../redux-types';

import { updateSpaceDescription } from '../actions/current-space';

interface _ReduxProps {
    /**
     * Description of the space
     */
    spaceDescription?: string;
}

interface _ReduxActionCreators {
    /**
     * Update introduction of the space
     */
    updateSpaceDescription: typeof updateSpaceDescription;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    spaceDescription:
        state.currentSpace.data && state.currentSpace.data.spaceDescription,
});

const mapDispatchToProps = {
    updateSpaceDescription,
};

const SpaceDescription = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_SpaceDescription);

export default SpaceDescription;
