import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserHistory } from 'history'
import App from './App.tsx'
import './index.css'

// Create browser history
const history = createBrowserHistory()

// Extract path from URL hash and update history
const path = (/#!(\/.*)$/.exec(location.hash) || [])[1]
if (path) {
  history.replace(path)
}

// Render the React app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
