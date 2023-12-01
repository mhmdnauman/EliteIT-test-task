import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Listing from './Pages/Listing'


export default function AppRouter() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/listing' element={<Listing/>}/>
    </Routes>
  )
}
