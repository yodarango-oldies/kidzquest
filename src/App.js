import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//comps
import Admin from './components/pages/Admin'
import Home from './components/pages/Home'
import SingleChild from './components/pages/SingleChild'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/child" element={<SingleChild />}></Route>
      </Routes>
    </Router>
  )
}

export default App
