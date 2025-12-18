import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/index.css' // create this file (can be empty for now)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
