import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css';
import App from './App';

// IMPORT AUTH PROVIDER
import AuthProvider from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>

    {/* WRAP APP WITH AUTH PROVIDER */}
    <AuthProvider>
      <App />
    </AuthProvider>

  </React.StrictMode>
);