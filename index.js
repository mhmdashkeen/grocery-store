import React, { Suspense, lazy } from 'react'
import  { createRoot }  from 'react-dom/client';
import { store } from "./src/store";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import ScreenLoader from './src/components/ScreenLoader';
const App = lazy(() => import('./src/App'));


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
        <Provider store={store}>
            <Router>
                <Suspense fallback={<ScreenLoader />}>
                    <App/>
                </Suspense>
            </Router>
        </Provider>
    );