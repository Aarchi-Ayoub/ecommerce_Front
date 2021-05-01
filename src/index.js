import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './component/router/Routes';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducers from './reducers';

const store = createStore( 
    rootReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
  );

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
