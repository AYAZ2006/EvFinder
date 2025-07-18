import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'leaflet/dist/leaflet.css'
import { ClerkProvider } from '@clerk/clerk-react'
const key='pk_test_bmF0aW9uYWwtZGFuZS03Ni5jbGVyay5hY2NvdW50cy5kZXYk'
if(!key){
  throw new Error('Missing Key')
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={key}>
      <App />
    </ClerkProvider>
  </StrictMode>,
)
