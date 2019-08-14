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

class _SpaceSearch extends React.Component<SpaceSearchProps> {
    public state: { searchInputOnFocus: boolean } = {
        searchInputOnFocus: false,
    };

    componentDidMount() {
        if (
            this.props.currentUser &&
            this.props.currentUser.authority == 'admin'
        ) {
            this.props.requestWholeSpaceList();
        }
    }

    private _searchSpace = (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (this.props.wholeSpaceList) {
            this.props.searchSpaceList(
                this.props.wholeSpaceList,
                ev.target.value,
            );
        }
    };

    private _renderSearchResult = () => {
        if (
            this.props.searchResult.length == 0 ||
            !this.state.searchInputOnFocus
        ) {
            return null;
        } else {
            return (
                <div id="space-search-result">
                    {this.props.searchResult.map((space: SpaceHeader) => (
                        <a key={space.id}>
                            <p className="h5">{space.names.ko}</p>
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
                <div id="space-search-group">
                    <input
                        id="space-search-input"
                        className="form-control"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={this._searchSpace}
                        onFocus={() => {
                            this.setState({ searchInputOnFocus: true });
                        }}
                        onBlur={() => {
                            this.setState({ searchInputOnFocus: false });
                        }}
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
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    currentUser: state.auth.currentUser,
    wholeSpaceList: state.spaceList.data,
    searchResult: state.spaceSearch.result,
});

const mapDispatchToProps = {
    requestWholeSpaceList,
    searchSpaceList,
};

const SpaceSearch = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_SpaceSearch);

export default SpaceSearch;
