import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './utils/configureStore';

import Routes from './routes';

const store = configureStore();

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
