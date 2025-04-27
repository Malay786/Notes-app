import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Register from './pages/Register'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import CreateNote from './pages/CreateNote'
import UpdateNote from './pages/UpdateNote'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Notes/>}/>
        <Route path='/signup' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/create' element={<CreateNote/>}/>
        <Route path='/update/:id' element={<UpdateNote/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App