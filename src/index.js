import React from 'react';
import ReactDOM from 'react-dom/client';
import {store} from './app/store'
import {Provider} from 'react-redux'
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';


// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      </Provider>
  </React.StrictMode>
);
