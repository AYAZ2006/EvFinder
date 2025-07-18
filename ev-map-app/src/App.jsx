import React, {Suspense,lazy} from 'react'
import {HashRouter as Router,Routes,Route,useLocation} from 'react-router-dom'
import { SignedIn,SignedOut,SignInButton,UserButton } from '@clerk/clerk-react'
import 'leaflet/dist/leaflet.css'
import {Toaster} from 'react-hot-toast'
const Contact=lazy(()=>import('./components/Contact'))
const Landing=lazy(()=>import('./components/Landing'))
const Try=lazy(()=>import('./components/Try'))
const Get=lazy(()=>import('./components/Get'))
function Apps() {
  const l=useLocation()
  const show=['/']
  return (
    <>
      <header style={{padding: '1rem',display: 'flex',justifyContent: 'flex-end',gap: '1rem',position: 'fixed',top: 0,right: 0,width: 'auto',zIndex: 1000,}}>
        <SignedOut><SignInButton /></SignedOut>
        <SignedIn>
          {show.includes(l.pathname) && (<UserButton appearance={{elements: {userButtonAvatarBox: {width: '35px',height: '35px',},},}}/>)}
        </SignedIn>
      </header>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path='/' element={<Landing/>}></Route>
          <Route path='/try' element={<Try/>}></Route>
          <Route path='/get' element={<Get/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
        </Routes>
      </Suspense>
    </>
  )
}
function App() {
  return (
    <Router>
      <Toaster/>
      <Apps/>
    </Router>
  )
}
export default App
