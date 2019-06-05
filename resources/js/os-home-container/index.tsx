import React from 'react';

import HomeHeader from './home-header';
import HomeSpacesTab from './home-spaces-tab';
import HomeMainView from './home-main-view';

export default class OSHomeContainer extends React.Component {
    render() {
        return (
            <div id="os-home-container" className="container-fluid">
                <HomeHeader />
                <div id="body" className="row">
                    <div id="spaces-tab">
                        <HomeSpacesTab />
                    </div>
                    <div id="main-view">
                        <HomeMainView />
                    </div>
                </div>
            </div>
        );
    }
}
