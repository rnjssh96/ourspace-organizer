import React from 'react';

import OSPageStatus from '../components/os-page-status';
import OSSpaceTree from '../components/os-space-tree';
import OSSpaceHistory from '../components/os-space-history';

/**
 *
 *
 * HomeSpacesTab props
 *
 *
 */
interface HomeSpacesTabProps extends _ReduxProps, _ReduxActionCreators {}

/**
 *
 *
 * HomeSpacesTab component
 *
 *
 */
class _HomeSpacesTab extends React.Component<HomeSpacesTabProps> {
    componentWillMount() {
        this.props.currentUser &&
            this.props.requestSpaceTrees(this.props.currentUser.owningSpaces);
    }

    render() {
        if (this.props.requestingStatus) {
            return <OSPageStatus status="loading" />;
        } else {
            if (
                this.props.currentUser &&
                this.props.currentUser.authority === 'Admin'
            ) {
                return <OSSpaceHistory />;
            } else {
                if (
                    this.props.spaceTrees &&
                    this.props.spaceTrees.length <= 0
                ) {
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
import SpaceTrees from '../model/space-tree';
import Organizer from '../model/organizer';
import { RequestStatus } from '../model/system';

import { requestSpaceTrees } from '../thunk-action/space-trees';

interface _ReduxProps {
    /**
     * Current user
     */
    currentUser?: Organizer;

    /**
     * Space trees requesting status
     */
    requestingStatus: RequestStatus;

    /**
     * All spaces in tree structure
     */
    spaceTrees?: SpaceTrees;
}

interface _ReduxActionCreators {
    /**
     * Request space trees from the server
     */
    requestSpaceTrees: (sids: SpaceID[]) => void;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    currentUser: state.auth.currentUser,
    requestingStatus: state.spaceTrees.requestingStatus,
    spaceTrees: state.spaceTrees.data,
});

const mapDispatchToProps = {
    requestSpaceTrees,
};

const HomeSpacesTab = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_HomeSpacesTab);

export default HomeSpacesTab;
