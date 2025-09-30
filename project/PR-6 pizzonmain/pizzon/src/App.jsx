import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import PizzaSection from './components/Daily.jsx'
import OurStory from './components/ourstory.jsx'
import Reservation from './components/Reservation.jsx'
import Strength from './components/Strength.jsx'
import Customer from './components/Customer.jsx'
import Menu from './components/Menu.jsx'
import Latest from './components/Latest.jsx'
import Homebanner from './components/homebanner.jsx'
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
function App() {


  return (
    <>
      <Header />
      <Homebanner />
      <PizzaSection />
      <Menu />
      <OurStory />
      <Strength />
      <Customer />
      <Reservation />
      <Latest />
      <Footer />
    </>
  )
}

export default App
