import React from 'react';
import { connect } from 'react-redux';

import RootState from '../redux-types';

import SpaceTrees, {
    traverseSpaceTree,
    SpaceTree,
    SpaceHeader,
} from '../model/space-tree';
import { FetchSpaceTreesFromOSDBAction } from '../redux-types/api-process';
import { fetchSpaceTreesFromOSDB } from '../actions/api-process';

import OSPageStatus from '../components/os-page-status';

const MAX_DEPTH = 4;

interface _ReduxProps {
    /**
     * All spaces in tree structure
     */
    spaceTrees: SpaceTrees;

    /**
     * Current space ID
     */
    currentSpaceID: string;

    /**
     * Space trees requesting
     */
    requestingSpaceTrees: boolean;
}

interface _ReduxActionCreators {
    /**
     * Fetch space trees data from OSDB
     */
    fetchSpaceTreesFromOSDB: FetchSpaceTreesFromOSDBAction;
}

interface HomeSpacesTabProps extends _ReduxProps, _ReduxActionCreators {}

class _HomeSpacesTab extends React.Component<HomeSpacesTabProps> {
    componentWillMount() {
        this.props.fetchSpaceTreesFromOSDB();
    }

    private _renderSpace(
        spaceHeader: SpaceHeader,
        depth: number,
        selcted = false,
    ) {
        return (
            <a
                key={spaceHeader.id}
                className={`space-item
                    depth-${depth > MAX_DEPTH ? MAX_DEPTH : depth} ${
                    selcted ? 'selected' : ''
                }
                ${
                    spaceHeader.id === this.props.currentSpaceID
                        ? 'selected'
                        : ''
                }`}
            >
                {depth == 0 && (
                    <img
                        src="./demo-images/about_img_01.jpg"
                        className="rounded"
                    />
                )}
                <div className="bullet" />
                <div className="space-item-body">
                    <p className="h5 os-text-ellipsis">스타벅스 자양점</p>
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
            rtn.push(this._renderSpace(spaceHeader, depth));
        });
        return rtn;
    };

    private _renderSpaceTrees = () => {
        if (this.props.requestingSpaceTrees) {
            return <OSPageStatus status="loading" />;
        } else {
            return this.props.spaceTrees.map((group: SpaceTree) => (
                <div key={group.spaceHeader.id} className="space-group">
                    {this._renderSpaceGroup(group)}
                </div>
            ));
        }
    };

    render() {
        return (
            <div id="home-spaces-tab">
                <p className="h4">
                    <b>스페이스</b>
                </p>
                {this._renderSpaceTrees()}
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    spaceTrees: state.spaceTrees.data,
    currentSpaceID: state.currentSpace.data.id,
    requestingSpaceTrees: state.spaceTrees.status.requestingSpaceTrees,
});

const mapDispatchToProps = {
    fetchSpaceTreesFromOSDB,
};

const HomeSpacesTab = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_HomeSpacesTab);

export default HomeSpacesTab;
