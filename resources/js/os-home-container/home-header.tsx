import React from 'react';
import { Link } from 'react-router-dom';

export default class HomeHeader extends React.Component {
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
                    <Link to="/" className="btn btn-outline-light">
                        Logout
                    </Link>
                </div>
            </header>
        );
    }
}
