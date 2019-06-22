import React from 'react';
import { SpaceHeader } from '../model/space-header';

/**
 *
 *
 * OSSpaceHistory props
 *
 *
 */
interface OSSpaceHistoryProps extends _ReduxProps, _ReduxActionCreators {}

/**
 *
 *
 * OSSpaceHistory component
 *
 *
 */
class _OSSpaceHistory extends React.Component<OSSpaceHistoryProps> {
    public state = {
        searchWord: '',
    };

    private _onSpaceClick = (spaceID: string) =>
        this.props.requestSpace(spaceID, false);

    private _onSearchClick = () => {
        this.props.requestSpace(this.state.searchWord, true);
    };

    private _renderSpaceHeader(spaceHeader: SpaceHeader) {
        return (
            <a
                key={spaceHeader.id}
                className={`space-item
                ${
                    spaceHeader.id === this.props.currentSpaceID
                        ? 'selected'
                        : ''
                }`}
                onClick={() => this._onSpaceClick(spaceHeader.id)}
            >
                <img src="./demo-images/about_img_01.jpg" className="rounded" />
                <div className="space-item-body">
                    <p className="h5 os-text-ellipsis">
                        {spaceHeader.names['ko']}
                    </p>
                    <p className="h6 os-grey-1">
                        <i className="material-icons">location_on</i>
                        서울 송파구 올림픽로 35길 104
                    </p>
                </div>
            </a>
        );
    }

    private _renderSpaceHistory = () => {
        let rtn: JSX.Element[] = [];
        this.props.historyStack.forEach((spaceID: string) =>
            rtn.push(
                this._renderSpaceHeader(this.props.historyHeaders[spaceID]),
            ),
        );
        return rtn;
    };

    private _renderSearchbar = () => {
        return (
            <div id="search-bar" className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="스페이스 ID"
                    value={this.state.searchWord}
                    onChange={ev => {
                        this.setState({ searchWord: ev.target.value });
                    }}
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={this._onSearchClick}
                    >
                        검색
                    </button>
                </div>
            </div>
        );
    };

    render() {
        return (
            <div id="os-space-history">
                <p id="header-text" className="h5">
                    스페이스
                </p>
                {this._renderSearchbar()}
                <p id="header-text" className="h5">
                    히스토리
                </p>
                <div id="history">{this._renderSpaceHistory()}</div>
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

import { requestSpace } from '../thunk-action/current-space';

interface _ReduxProps {
    /**
     * Current space ID
     */
    currentSpaceID?: string;

    /**
     * Stack of space history
     */
    historyStack: string[];

    /**
     * Headers of space history
     */
    historyHeaders: { [spaceID: string]: SpaceHeader };
}

interface _ReduxActionCreators {
    /**
     * Fetch space trees from OSDB
     */
    requestSpace: (spaceID: string, pushHistory: boolean) => void;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    currentSpaceID: state.currentSpace.data && state.currentSpace.data.id,
    historyStack: state.spaceHistory.data.stack,
    historyHeaders: state.spaceHistory.data.headers,
});

const mapDispatchToProps = {
    requestSpace,
};

const OSSpaceHistory = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_OSSpaceHistory);

export default OSSpaceHistory;
