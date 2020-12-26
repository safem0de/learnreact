import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './components/App';
import Login from './components/Login';
import Authenticated from './components/Authenticated';
import Loading from'./components/Loading';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './reducers';
import Header from './components/Header';
import NoteDetail from './components/NoteDetail';
import NoteEdit from './components/NoteEdit';

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode> 
  <Provider store={store}>
    <BrowserRouter>
      <Loading>
        <Switch>
          <Route path='/login' component={Login} exact={true}/>
          <Authenticated>
          <Header/>
              <Route path='/' component={App} exact={true}/>
              <Route path='/:id' component={NoteDetail} exact={true}/>
              <Route path='/:id/edit' component={NoteEdit} exact={true}/>
          </Authenticated>
        </Switch>
      </Loading>
    </BrowserRouter>
  </Provider>
  </React.StrictMode>
  ,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
