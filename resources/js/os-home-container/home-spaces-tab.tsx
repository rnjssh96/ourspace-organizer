import React from 'react';
import { connect } from 'react-redux';

import RootState from '../redux-types';
import { FetchSpaceTreesAction } from '../redux-types/osdb-api';

import SpaceTrees from '../model/space-tree';
import { fetchSpaceTrees } from '../actions/osdb-api';

import OSPageStatus from '../components/os-page-status';
import OSOrganizer from '../model/organizer';
import OSSpaceTree from '../components/os-space-tree';

interface _ReduxProps {
    /**
     * Current user
     */
    currentUser?: OSOrganizer;

    /**
     * All spaces in tree structure
     */
    spaceTrees: SpaceTrees;

    /**
     * Space trees requesting
     */
    requestingSpaceTrees: boolean;
}

interface _ReduxActionCreators {
    /**
     * Fetch space trees from OSDB
     */
    fetchSpaceTrees: FetchSpaceTreesAction;
}

interface HomeSpacesTabProps extends _ReduxProps, _ReduxActionCreators {}

class _HomeSpacesTab extends React.Component<HomeSpacesTabProps> {
    componentWillMount() {
        this.props.currentUser &&
            this.props.fetchSpaceTrees(this.props.currentUser.uid);
    }

    render() {
        if (this.props.requestingSpaceTrees) {
            return <OSPageStatus status="loading" />;
        } else if (this.props.spaceTrees.length <= 0) {
            return (
                <OSPageStatus
                    status="information"
                    info="관리중인 스페이스가 존재하지 않습니다."
                />
            );
        } else {
            return <OSSpaceTree />;
        }
    }
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    currentUser: state.auth.currentUser,
    spaceTrees: state.spaceTrees.data,
    requestingSpaceTrees: state.spaceTrees.status.requestingSpaceTrees,
});

const mapDispatchToProps = {
    fetchSpaceTrees,
};

const HomeSpacesTab = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_HomeSpacesTab);

export default HomeSpacesTab;
