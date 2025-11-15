import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Header from './Components/Header/Header'
import Addproduct from './Components/AddProduct/Addproduct'
import Home from './Components/Home/Home'
import Men from './Components/Menwear/Men'
import EditProduct from './Components/EditProduct/EditProduct'
import Footer from './Components/Footer/Footer'
import Women from './Components/womenwear/women'
import Kids from './Components/Kidswear/Kidswear'
import SignIn from './Components/signin/SignIn'
import SignUp from './Components/signup/SignUp'


function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Addproduct' element={<Addproduct />} />
        <Route path='editproduct/:id' element={<EditProduct />} />
        <Route path='/Men' element={<Men />} />
        <Route path='/signIn' element={<SignIn />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/Women' element={<Women />} />
        <Route path='/Kids' element={<Kids />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
