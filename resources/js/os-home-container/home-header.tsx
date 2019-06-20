import React from 'react';

/**
 *
 *
 * HomeHeader props
 *
 *
 */
interface HomeHeaderProps extends _ReduxProps, _ReduxActionCreators {}

/**
 *
 *
 * HomeHeader component
 *
 *
 */
class _HomeHeader extends React.Component<HomeHeaderProps> {
    private _onLogout = (ev: React.MouseEvent) => {
        ev.preventDefault();
        this.props.requestLogout();
    };

    render() {
        return (
            <header id="home-header" className="row">
                <div id="main">
                    <img
                        src="./demo-images/item_image_02.jpg"
                        className="rounded-circle"
                    />
                    <div id="profile-text">
                        <p className="h4">
                            {this.props.currentUser &&
                                this.props.currentUser.name}
                        </p>
                        <p className="h6 os-grey-1">
                            {this.props.currentUser &&
                                this.props.currentUser.authority}
                        </p>
                    </div>
                </div>
                <div id="left-buttons">
                    <button
                        className="btn btn-outline-light"
                        onClick={this._onLogout}
                    >
                        Logout
                    </button>
                </div>
            </header>
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

import Organizer from '../model/organizer';

import { requestLogout } from '../thunk-action/auth';

interface _ReduxProps {
    /**
     * Current user
     */
    currentUser?: Organizer;
}

interface _ReduxActionCreators {
    /**
     * Log out
     */
    requestLogout: () => void;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    currentUser: state.auth.currentUser,
});

const mapDispatchToProps = {
    requestLogout,
};

const HomeHeader = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_HomeHeader);

export default HomeHeader;
