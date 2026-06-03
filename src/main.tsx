import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Pastiin baris ini mengarah ke file CSS lu!
import './style/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)