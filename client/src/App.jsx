import React from 'react'
import Navbar from './components/NavBar'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Product from './components/product/Product'
import { Routes, Route } from "react-router";

const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="product" element={<Product />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  )
}

export default App