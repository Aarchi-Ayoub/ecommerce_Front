import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './component/router/Routes';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.css';
import 'font-awesome/css/font-awesome.css'
ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);
