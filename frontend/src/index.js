import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { store } from './store/store';
import { Provider } from 'react-redux'
import './styles/style.scss'

import ReactNotification from 'react-notifications-component'
import "animate.css"
import 'react-notifications-component/dist/theme.css'

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ReactNotification />
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();


