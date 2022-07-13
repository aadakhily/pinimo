import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './assets/styles/index.scss'
import { AuthProvider } from './context/auth'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
