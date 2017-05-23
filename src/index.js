import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {Router, Route, hashHistory, Link, IndexLink, IndexRoute} from 'react-router';
import $ from 'jquery';
import AsteroidContainer from './Asteroid';
import AsteroidReducer from './Asteroid.reducer';
import './index.css';

const reducer = Redux.combineReducers({
    asteroid: AsteroidReducer
})

const store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    Redux.compose(Redux.applyMiddleware(ReduxThunk))
);

class AppLayout extends React.Component {
    render() {
        return(
            <div>{this.props.children}</div>
        );
    }
}

const AppLayoutContainer = ReactRedux.connect(
    state => ({state})
)(AppLayout);


ReactDOM.render(
    <ReactRedux.Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={AppLayoutContainer}>
          <IndexRoute component={AsteroidContainer}/>
      </Route>
    </Router>
  </ReactRedux.Provider>,
  document.getElementById('root')
);
