/**
 *
 *
 * SpaceSearch props
 *
 *
 */
interface SpaceSearchProps extends _ReduxProps, _ReduxActionCreators {}

/**
 *
 *
 * SpaceSearch component
 *
 *
 */

import React from 'react';

import NewSpaceButton from './new-space-button';

class _SpaceSearch extends React.Component<SpaceSearchProps> {
    private searchGroup: HTMLDivElement | null = null;

    public state: { searchQuery: string; searchInputOnFocus: boolean } = {
        searchQuery: '',
        searchInputOnFocus: false,
    };

    componentWillMount() {
        document.addEventListener('mousedown', this._detectFocus, false);
    }

    componentDidMount() {
        if (
            this.props.currentUser &&
            this.props.currentUser.authority == 'admin'
        ) {
            this.props.requestWholeSpaceList();
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this._detectFocus, false);
    }

    private _detectFocus = (event: MouseEvent) => {
        if (
            this.searchGroup &&
            this.searchGroup.contains(event.target as Node)
        ) {
            this.setState({ ...this.state, searchInputOnFocus: true });
        } else {
            this.setState({ ...this.state, searchInputOnFocus: false });
        }
    };

    private _searchSpace = (ev: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, searchQuery: ev.target.value });
        if (this.props.wholeSpaceList) {
            this.props.searchSpaceList(
                this.props.wholeSpaceList,
                ev.target.value,
            );
        }
    };

    private _requestSpace = (spaceID: string) => {
        this.props.requestSpace(spaceID);
        this.setState({ searchQuery: '', searchInputOnFocus: false });
        this.props.searchSpaceList([], '');
    };

    private _renderSearchResult = () => {
        if (
            this.props.searchResult.length > 0 &&
            this.state.searchInputOnFocus
        ) {
            return (
                <div id="space-search-result">
                    {this.props.searchResult.map((space: SpaceHeader) => (
                        <a
                            key={space.id}
                            onClick={() => {
                                this._requestSpace(space.id);
                            }}
                        >
                            <p className="h5">{space.spaceNames.ko}</p>
                        </a>
                    ))}
                </div>
            );
        }
    };

    render() {
        return (
            <div id="space-search">
                <p className="h2">Space</p>
                <NewSpaceButton />
                <div
                    id="space-search-group"
                    ref={node => (this.searchGroup = node)}
                >
                    <input
                        id="space-search-input"
                        className="form-control"
                        type="search"
                        value={this.state.searchQuery}
                        placeholder="Search"
                        aria-label="Search"
                        autoComplete="off"
                        onChange={this._searchSpace}
                    />
                    {this._renderSearchResult()}
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

import { SpaceHeader } from '../model/space-header';
import Organizer from '../model/organizer';

import {
    requestWholeSpaceList,
    searchSpaceList,
} from '../thunk-action/space-list';
import { requestSpace } from '../thunk-action/current-space';

interface _ReduxProps {
    /**
     * Current user
     */
    currentUser?: Organizer;

    /**
     * Whole Space list
     */
    wholeSpaceList?: SpaceHeader[];

    /**
     * Space search result
     */
    searchResult: SpaceHeader[];
}

interface _ReduxActionCreators {
    /**
     * Request whole space list from the server
     */
    requestWholeSpaceList: () => void;

    /**
     * Search space list from the whol space list
     */
    searchSpaceList: (spaceList: SpaceHeader[], qeury: String) => void;

    /**
     * Request space data from the server
     */
    requestSpace: (spaceID: string, pushHistory?: boolean) => void;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    currentUser: state.auth.currentUser,
    wholeSpaceList: state.spaceList.data,
    searchResult: state.spaceSearch.result,
});

const mapDispatchToProps = {
    requestWholeSpaceList,
    searchSpaceList,
    requestSpace,
};

const SpaceSearch = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_SpaceSearch);

export default SpaceSearch;
