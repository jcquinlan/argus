import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import axios from 'axios';
import ReduxToastr from 'react-redux-toastr';

import App from './App';
import { hasKeyGuard } from './guards/hasKeyGuard';
import { SET_USER, LOGIN } from './constants';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

import ProjectListPage from './pages/ProjectListPage';
import PeopleListPage from './pages/PeopleListPage';
import LoginPage from './pages/LoginPage';

import './index.css';
import 'react-redux-toastr/src/styles/index.scss';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  )
);

// Check to see what is stored in localStorage when the app starts.
const onAppInit = (nextState, replace, callback) => {
    const user = localStorage.getItem('user');
    const api_key = localStorage.getItem('api_key');
    const company = localStorage.getItem('company');

    // If they API Key and Company name are already set, set the axios defaults to use these in future API calls.
    if(api_key && company){
          axios.defaults.baseURL = `http://${ company }.teamwork.com`;
          axios.defaults.headers.common['Authorization'] = 'Basic ' + btoa(api_key + ':anything');
    }

    // If the User is saved, update Redux with cached user information
    if(user && api_key && company){
        store.dispatch({ type: SET_USER, user: JSON.parse(user) })
        store.dispatch({ type: LOGIN, isLoggedIn: true })
        // Callback is like a "next" function, app initialization is stopped until it is called.
        callback();
    } else if(api_key && company){
        // If there is no user, but the API Key Company are saved, query Teamwork to get the user, then save that to localStorage
        // and update Redux with the user
        axios.get('/me.json').then(response => {
            localStorage.setItem('user', JSON.stringify(response.data.person));
            store.dispatch({ type: SET_USER, user: response.data.person })
            // Callback is like a "next" function, app initialization is stopped until it is called.
            callback();
        })
    }
    // Continue to route
    callback();
  };

ReactDOM.render(
  (
    <Provider store={ store }>
      <div>
            <Router history={ browserHistory }>
              <Route path="/" component={ App } onEnter={ onAppInit }>
                  <IndexRoute component={ ProjectListPage } onEnter={ hasKeyGuard }/>
                  <Route component={ PeopleListPage } path="people"/>
                  <Route component={ LoginPage } path="login"/>
              </Route>
            </Router>

            <ReduxToastr 
                    timeOut={ 2000 }
                    position="bottom-center"
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"/>
        </div>
      </Provider>

  ),
  document.getElementById('root')
);
