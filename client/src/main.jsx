import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { EditPopupProvider } from './context/EditPopupContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EditPopupProvider>
     <App />
  </EditPopupProvider>
  </React.StrictMode>,
)
