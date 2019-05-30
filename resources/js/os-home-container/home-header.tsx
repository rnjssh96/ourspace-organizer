import React from 'react';

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
                    <button type="button" className="btn btn-outline-secondary">
                        Logout
                    </button>
                </div>
            </header>
        );
    }
}
