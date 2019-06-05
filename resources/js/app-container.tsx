import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import RootReducer from './reducer';

import OSHomeContainer from './os-home-container';
import OSLoginContainer from './os-login-container';

const rootStore = createStore(RootReducer, applyMiddleware(thunk));

class App extends React.Component {
    render() {
        return (
            <Provider store={rootStore}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={OSLoginContainer} />
                        <Route path="/:userid" component={OSHomeContainer} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

if (document.getElementById('app-container')) {
    ReactDOM.render(<App />, document.getElementById('app-container'));
}
