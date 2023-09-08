import { useState } from 'react'
import { Route, Routes, NavLink } from 'react-router-dom';
import Auth from './views/Auth';
import Signup from './views/Signup';
import Login from './views/Login';
import Todo from './views/Todo';
import Notfound from './views/Notfound';
import { useNavigate } from "react-router-dom";


function App() {

  function style({ isActive }) {
    return {
      color: isActive ? '#EACD65' : null
    }
  }

  return (
    <>
      <nav className='text-center my-5' id="nav">
        <NavLink to="/signup" style={style} className="ps-4 ms-5 badge">註冊</NavLink>
        <NavLink to="/login" style={style} className="ms-1 badge">登入</NavLink>
        {/* <NavLink to="/todo/list" style={style} id='todotoday'  className="ms-1 badge">待辦事項</NavLink> */}
      </nav>

      <Routes>
        <Route path='/' element={<Auth />}>
          <Route path='signup' element={<Signup />} />
          <Route path='login' element={<Login />} />
        </Route>

        <Route path='/todo/list' element={<Todo />} />

        <Route path='*' element={<Notfound />} />
      </Routes>
    </>
  )
}

export default App
