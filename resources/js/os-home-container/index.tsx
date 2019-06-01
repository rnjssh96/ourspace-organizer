import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import RootReducer from '../reducer';

import HomeHeader from './home-header';
import HomeSpacesTab from './home-spaces-tab';
import HomeMainView from './home-main-view';

class OSHomeContainer extends React.Component {
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

const rootStore = createStore(RootReducer);

if (document.getElementById('os-home-container')) {
    ReactDOM.render(
        <Provider store={rootStore}>
            <OSHomeContainer />
        </Provider>,
        document.getElementById('os-home-container'),
    );
}
