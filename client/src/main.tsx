// main.tsx - Entry point for the application
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// vite-env.d.ts - TypeScript declaration file for Vite
// <reference types="vite/client" />