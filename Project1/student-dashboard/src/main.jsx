import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ✅ Mount the full app, not just dashboard

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
