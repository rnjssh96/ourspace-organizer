import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import RootReducer from './reducer';

import OSHomeContainer from './os-home-container';

const rootStore = createStore(RootReducer);

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Provider store={rootStore}>
                    <OSHomeContainer />
                </Provider>
            </BrowserRouter>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
