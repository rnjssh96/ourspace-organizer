import React from 'react';
import { connect } from 'react-redux';

import RootState from '../redux-types';

import { updateSpaceIntroduce } from '../actions/current-space';

type Mode = 'display' | 'edit';

interface _ReduxProps {
    /**
     * Introduction of the space
     */
    spaceIntroduce?: string;
}

interface _ReduxActionCreators {
    /**
     * Update introduction of the space
     */
    updateSpaceIntroduce: typeof updateSpaceIntroduce;
}

interface OSSpaceIntroduceProps extends _ReduxProps, _ReduxActionCreators {}

class _OSSpaceIntroduce extends React.Component<OSSpaceIntroduceProps> {
    state: { mode: Mode; textValue: string } = {
        mode: 'display',
        textValue: '',
    };

    private _swtichMode = (m: Mode) => {
        this.setState({ mode: m, textValue: this.props.spaceIntroduce });
    };

    private _onTextChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            ...this.state,
            textValue: ev.target.value,
        });
    };

    private _save = () => {
        this.props.updateSpaceIntroduce(this.state.textValue);
        this._swtichMode('display');
    };

    private _renderDisplayMode = () =>
        this.props.spaceIntroduce ? (
            <p className="h6">{this.props.spaceIntroduce}</p>
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
            <div id="os-space-introduce">
                <div className="header">
                    <p className="h5">소개</p>
                    {this.state.mode === 'display' && (
                        <button
                            onClick={() => {
                                this._swtichMode('edit');
                            }}
                        >
                            <p className="h6 os-grey-1">
                                <i className="material-icons">edit</i>
                                수정
                            </p>
                        </button>
                    )}
                </div>
                <div className="body">
                    {this.state.mode === 'display'
                        ? this._renderDisplayMode()
                        : this._renderEditMode()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    spaceIntroduce: state.currentSpace.data.spaceIntroduce,
});

const mapDispatchToProps = {
    updateSpaceIntroduce,
};

const OSSpaceIntroduce = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_OSSpaceIntroduce);

export default OSSpaceIntroduce;
