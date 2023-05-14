import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App/App';
//import App from './components/App/App_copy'
//import App from './components/App/App_copy3'
//import App from './components/App/App_copyRestored'
//import App from './components/App/App_copy4'
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
   </React.StrictMode>
);
serviceWorker.unregister();
reportWebVitals();
