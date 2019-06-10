import React from 'react';
import { connect } from 'react-redux';

import RootState from '../redux-types';
import { FetchSpaceAction } from '../redux-types/osdb-api';

import SpaceTrees, { traverseSpaceTree, SpaceTree } from '../model/space-tree';
import { fetchSpace } from '../actions/osdb-api';
import { SpaceHeader } from '../model/space-header';

const MAX_DEPTH = 4;

interface _ReduxProps {
    /**
     * All spaces in tree structure
     */
    spaceTrees: SpaceTrees;

    /**
     * Current space ID
     */
    currentSpaceID?: string;
}

interface _ReduxActionCreators {
    /**
     * Fetch space trees from OSDB
     */
    fetchSpace: FetchSpaceAction;
}

interface OSSpaceTreeProps extends _ReduxProps, _ReduxActionCreators {}

class _OSSpaceTree extends React.Component<OSSpaceTreeProps> {
    private _onSpaceClick = (spaceID: string) => this.props.fetchSpace(spaceID);

    private _renderSpaceHeader(spaceHeader: SpaceHeader, depth: number) {
        return (
            <a
                key={spaceHeader.id}
                className={`space-item
                    depth-${depth > MAX_DEPTH ? MAX_DEPTH : depth} 
                ${
                    spaceHeader.id === this.props.currentSpaceID
                        ? 'selected'
                        : ''
                }`}
                onClick={() => this._onSpaceClick(spaceHeader.id)}
            >
                {depth == 0 && (
                    <img
                        src="./demo-images/about_img_01.jpg"
                        className="rounded"
                    />
                )}
                <div className="bullet" />
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

    private _renderSpaceGroup = (group: SpaceTree) => {
        let rtn: JSX.Element[] = [];
        traverseSpaceTree(group, (spaceHeader: SpaceHeader, depth: number) => {
            rtn.push(this._renderSpaceHeader(spaceHeader, depth));
        });
        return rtn;
    };

    private _renderSpaceTrees = () =>
        this.props.spaceTrees.map((group: SpaceTree) => (
            <div key={group.spaceHeader.id} className="space-group">
                {this._renderSpaceGroup(group)}
            </div>
        ));

    render() {
        return (
            <div id="os-space-tree">
                <p id="header-text" className="h5">
                    스페이스
                </p>
                {this._renderSpaceTrees()}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    spaceTrees: state.spaceTrees.data,
    currentSpaceID: state.currentSpace.data && state.currentSpace.data.id,
});

const mapDispatchToProps = {
    fetchSpace,
};

const OSSpaceTree = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_OSSpaceTree);

export default OSSpaceTree;
