import React from 'react';
import { connect } from 'react-redux';

import RootState from '../redux-types';

import { LogOutAction } from '../redux-types/firebase-auth';

import { logOut } from '../actions/firebase-auth';

interface _ReduxProps {}

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
                        <p className="h4">강남건물주</p>
                        <p className="h6 os-grey-1">Organizer</p>
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

const mapStateToProps = (state: RootState): _ReduxProps => ({});

const mapDispatchToProps = {
    logOut,
};

const HomeHeader = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_HomeHeader);

export default HomeHeader;
