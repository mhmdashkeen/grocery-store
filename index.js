import React from 'react'
import  { createRoot }  from 'react-dom/client';
import App from './src/App'
import { store } from "./src/store";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    );