import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
const loader = document.querySelector('.loader');

const hideLoader = () => loader?.classList.add('loader--hide');

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App hideLoader={hideLoader} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
