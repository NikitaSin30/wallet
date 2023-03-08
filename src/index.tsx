import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import './shared/firebase/firebase';
import { UserStore } from 'shared/store/userStore/UserStore';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider value={UserStore}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
);
