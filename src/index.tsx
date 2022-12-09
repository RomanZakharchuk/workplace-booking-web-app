import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import './fonts/GolosText/Golos-Text_Regular.ttf';
import './fonts/GolosText/Golos-Text_Medium.ttf';
import './fonts/GolosText/Golos-Text_Bold.ttf';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
        <App />
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
