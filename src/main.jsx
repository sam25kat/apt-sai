import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../architecture (1).jsx'

// Create root element if it doesn't exist
if (!document.getElementById('root')) {
  const root = document.createElement('div')
  root.id = 'root'
  document.body.appendChild(root)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
