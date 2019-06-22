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

import { SpaceHeader } from '../model/space-header';

import OSEditButton from './os-edit-button';

const data: SpaceHeader[] = [
    { id: 'asdfasdfasdf', names: { en: 'space 1', ko: '스페이스 1' } },
    { id: 'asdfasdf', names: { en: 'space 2', ko: '스페이스 2' } },
];

class _SpaceList extends React.Component<SpaceListProps> {
    private _onSpaceClick = (spaceID: string) =>
        this.props.requestSpace(spaceID);

    private _renderTabs = () => {
        return (
            <div id="tabs">
                {data.map((spaceHeader: SpaceHeader) => (
                    <a
                        key={spaceHeader.id}
                        className={`space-tab ${
                            spaceHeader.id === this.props.currentSpaceID
                                ? 'active-space'
                                : ''
                        }`}
                    >
                        <p className="h4">{spaceHeader.names['ko']}</p>
                    </a>
                ))}
            </div>
        );
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

import { requestSpace } from '../thunk-action/current-space';

interface _ReduxProps {
    /**
     * Current space ID
     */
    currentSpaceID?: string;
}

interface _ReduxActionCreators {
    /**
     * Request space from the server
     */
    requestSpace: (spaceID: string) => void;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    currentSpaceID: state.currentSpace.data && state.currentSpace.data.id,
});

const mapDispatchToProps = {
    requestSpace,
};

const SpaceList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_SpaceList);

export default SpaceList;
