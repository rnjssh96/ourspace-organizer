import React from 'react';

export default class HomeHeader extends React.Component {
    render() {
        return (
            <header id="home-header" className="row">
                <div id="main" />
                <div id="left-buttons">
                    <button type="button" className="btn btn-outline-secondary">
                        Logout
                    </button>
                </div>
            </header>
        );
    }
}
