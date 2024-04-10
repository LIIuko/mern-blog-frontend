import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import {BrowserRouter} from "react-router-dom";
import store from "./redux/store.js";
import {Provider} from "react-redux";

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <>
        <CssBaseline/>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>
        </ThemeProvider>
    </>
    // </React.StrictMode>
)
