import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import RootReducer from './reducer';

import OSBeginContainer from './os-begin-container';
import OSHomeScree from './screen/home-screen';

const rootStore = createStore(RootReducer, applyMiddleware(thunk));

class App extends React.Component {
    render() {
        return (
            <Provider store={rootStore}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={OSBeginContainer} />
                        <Route path="/:userid" component={OSHomeScree} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

if (document.getElementById('app-container')) {
    ReactDOM.render(<App />, document.getElementById('app-container'));
}
