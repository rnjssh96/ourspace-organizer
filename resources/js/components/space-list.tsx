/**
 *
 *
 * SpaceList props
 *
 *
 */
interface SpaceListProps extends _ReduxProps, _ReduxActionCreators {}

/**
 *
 *
 * SpaceList component
 *
 *
 */

import React from 'react';

import { SpaceHeader } from '../model/space-list';

import OSEditButton from './os-edit-button';

class _SpaceList extends React.Component<SpaceListProps> {
    componentDidMount() {
        if (this.props.currentUser) {
            this.props.requestSpaceList(this.props.currentUser.owningSpaces);
        }
    }

    private _onSpaceClick = (spaceID: string) =>
        this.props.requestSpace(spaceID);

    private _renderTabs = () => {
        if (this.props.spaceList) {
            return (
                <div id="tabs">
                    {this.props.spaceList.map((spaceHeader: SpaceHeader) => (
                        <a
                            key={spaceHeader.id}
                            className={`space-tab ${
                                spaceHeader.id === this.props.currentSpaceID
                                    ? 'active-space'
                                    : ''
                            }`}
                            onClick={() => {
                                this._onSpaceClick(spaceHeader.id);
                            }}
                        >
                            <p className="h4">{spaceHeader.names['ko']}</p>
                        </a>
                    ))}
                </div>
            );
        }
    };

    render() {
        return (
            <div id="space-list">
                <p className="h2">Space</p>
                <div id="tab-list">{this._renderTabs()}</div>
                <OSEditButton />
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

import { SpaceID } from '../model/space';

import { requestSpaceList } from '../thunk-action/space-list';
import { requestSpace } from '../thunk-action/current-space';
import Organizer from '../model/organizer';

interface _ReduxProps {
    /**
     * Current user
     */
    currentUser?: Organizer;

    /**
     * Current space ID
     */
    currentSpaceID?: string;

    /**
     * Space list
     */
    spaceList?: SpaceHeader[];
}

interface _ReduxActionCreators {
    /**
     * Request space list from the server
     */
    requestSpaceList: (spaceIDs: SpaceID[]) => void;

    /**
     * Request space from the server
     */
    requestSpace: (spaceID: string) => void;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    currentUser: state.auth.currentUser,
    currentSpaceID: state.currentSpace.data && state.currentSpace.data.id,
    spaceList: state.spaceList.data,
});

const mapDispatchToProps = {
    requestSpaceList,
    requestSpace,
};

const SpaceList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_SpaceList);

export default SpaceList;
