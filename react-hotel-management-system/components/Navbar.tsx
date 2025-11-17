import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar: React.FC = () => {
  const { user } = useAuth();

  const activeLinkClass = 'bg-indigo-700 text-white';
  const inactiveLinkClass = 'text-indigo-100 hover:bg-indigo-500 hover:bg-opacity-75';
  const linkClasses = `px-3 py-2 rounded-md text-sm font-medium transition-colors`;

  return (
    <nav className="bg-indigo-600">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-white font-bold text-xl">
              React Hotel
            </NavLink>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <NavLink to="/" className={({isActive}) => `${linkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}>
                  Rooms
                </NavLink>
                <NavLink to="/products" className={({isActive}) => `${linkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}>
                  Products
                </NavLink>
                <NavLink to="/reservations" className={({isActive}) => `${linkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}>
                  My Reservations
                </NavLink>
                <NavLink to="/add-room" className={({isActive}) => `${linkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}>
                  Add Room
                </NavLink>
                 <NavLink to="/add-product" className={({isActive}) => `${linkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}>
                  Add Product
                </NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user && (
                <span className="text-indigo-200">Welcome, {user.email}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
