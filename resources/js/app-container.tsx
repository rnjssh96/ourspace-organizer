import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import RootReducer from './reducer';

import OSHomeContainer from './os-home-container';
import OSLoginContainer from './os-login-container';

const rootStore = createStore(RootReducer);

class App extends React.Component {
    render() {
        return (
            <Provider store={rootStore}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={OSLoginContainer} />
                        <Route path="/home" component={OSHomeContainer} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

if (document.getElementById('app-container')) {
    ReactDOM.render(<App />, document.getElementById('app-container'));
}
