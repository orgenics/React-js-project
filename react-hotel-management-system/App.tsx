
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import RoomList from './components/RoomList';
import ReservationForm from './components/ReservationForm';
import ReservationList from './components/ReservationList';
import AddRoomForm from './components/AddRoomForm';
import ProductList from './components/ProductList';
import AddProductForm from './components/AddProductForm';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<RoomList />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/add-room" element={<AddRoomForm />} />
              <Route path="/add-product" element={<AddProductForm />} />
              <Route path="/book/:roomId" element={<ReservationForm />} />
              <Route path="/edit-reservation/:reservationId" element={<ReservationForm />} />
              <Route path="/reservations" element={<ReservationList />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
