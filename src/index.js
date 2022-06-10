import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './redux/store';
import {Provider} from "react-redux"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Update from './components/update';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/update/:id" element={<Update/>}  />
      </Routes>
    </BrowserRouter>
  </Provider>
);


