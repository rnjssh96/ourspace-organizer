import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import RootReducer from './reducer';

import OSHomeContainer from './os-home-container';

const rootStore = createStore(RootReducer);

class App extends React.Component {
    render() {
        return (
            <Provider store={rootStore}>
                <OSHomeContainer />
            </Provider>
        );
    }
}

if (document.getElementById('app-container')) {
    ReactDOM.render(<App />, document.getElementById('app-container'));
}
