import ReactDOM from 'react-dom/client';
import React from 'react';  
import App from './App.jsx';
import './index.css';
import { SocketProvider } from "../src/Components/Context/SocketContenxt.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SocketProvider>
        <App />
    </SocketProvider>
)
//ReactDOM.createRoot(document.getElementById('root')).render(<App />);