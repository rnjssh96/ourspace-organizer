import React from 'react';
import { connect } from 'react-redux';

import RootState from '../redux-types';

import { LogOutAction } from '../redux-types/firebase-auth';

import { logOut } from '../actions/firebase-auth';

import OSOrganizer from '../model/organizer';

interface _ReduxProps {
    /**
     * Current user
     */
    currentUser?: OSOrganizer;
}

interface _ReduxActionCreators {
    /**
     * Log out
     */
    logOut: LogOutAction;
}

interface HomeHeaderProps extends _ReduxProps, _ReduxActionCreators {}

class _HomeHeader extends React.Component<HomeHeaderProps> {
    private _onLogout = (ev: React.MouseEvent) => {
        ev.preventDefault();
        this.props.logOut();
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

const mapStateToProps = (state: RootState): _ReduxProps => ({
    currentUser: state.auth.currentUser,
});

const mapDispatchToProps = {
    logOut,
};

const HomeHeader = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_HomeHeader);

export default HomeHeader;
