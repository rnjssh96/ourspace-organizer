import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

class HomeHeader extends React.Component<RouteComponentProps> {
    private _onLogout = (ev: React.MouseEvent) => {
        ev.preventDefault();
        this.props.history.goBack();
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

export default withRouter(HomeHeader);
