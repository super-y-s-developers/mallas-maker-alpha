import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from 'services/reducers';

// Import components and styles
import Plan from 'scenes/Plan';
import './index.css';

// Create redux store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));


ReactDOM.render(
  <Provider store={store}>
    <Plan />
  </Provider>,
  document.getElementById('root'));
