import React from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './components/pages/Dashboard'; // ✅ Correct path

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Dashboard />
  </React.StrictMode>
);
