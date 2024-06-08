import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Step 1 - Create initial store object
let initialStore = {
  userDetails:{},
};
// Step 2 - Create the reducer
let reducer = (updatedStore = initialStore, dispatchedObj) => {
  console.log('inside reducer');
  console.log(dispatchedObj);

  if (dispatchedObj.type === "login") {
    return { ...updatedStore, userDetails: dispatchedObj.data };
  } 
  return updatedStore;
};

// step 3 - create the store
let store = createStore(reducer);
 
let root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

   // Step 4: Access the store
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
