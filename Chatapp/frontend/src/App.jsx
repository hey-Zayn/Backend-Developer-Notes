import React from 'react'
import { Navigate, Route, Router, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Signup from './pages/Signup'
import Setting from './pages/Setting'
import Profile from './pages/Profile'
const App = () => {
  const authUser = false;
  return (

      <Routes>
        <Route path="/" element={!authUser ? <Home /> : <Navigate to="/signin" />} />
        <Route path="/signin" element={!authUser ? <SignIn /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/setting" element={ <Setting /> } />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/" />} />
      </Routes>
   
  )
}

export default App