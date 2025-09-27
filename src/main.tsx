import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '../app/layout'
import '../app/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App>
      <div>Loading...</div>
    </App>
  </StrictMode>,
)