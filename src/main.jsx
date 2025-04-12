import React, { StrictMode } from 'react'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM, { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
  </React.StrictMode>
)
