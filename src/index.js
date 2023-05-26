import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from "./state";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
const store=configureStore({
  reducer:authReducer,

})
root.render(
  <Provider store={store}>
    <App />
    </Provider>
);

