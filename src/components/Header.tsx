import React, { useState } from 'react';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                  {/* Logo */}
                  <NavLink to="/" className="flex items-center space-x-2">
                      <div className="bg-purple-600 p-2 rounded-lg">
                          <Phone className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xl font-bold text-gray-900">MediCare</span>
                  </NavLink>

                  {/* Desktop Navigation */}
                  <nav className="hidden md:flex space-x-8">
                      {navigation.map((item) => (
                          <NavLink
                              key={item.name}
                              to={item.href}
                              className={`text-sm font-medium transition-colors duration-200 ${
                                  isActive(item.href)
                                      ? "text-purple-600 border-b-2 border-purple-600 pb-1"
                                      : "text-gray-700 hover:text-purple-600"
                              }`}
                          >
                              {item.name}
                          </NavLink>
                      ))}
                  </nav>

                  {/* Desktop CTA Buttons */}
                  <div className="hidden md:flex items-center space-x-4">
                      <NavLink to={"/login"} className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors duration-200">
                          LogIn
                      </NavLink>
                      <NavLink to={"/register"} className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors duration-200">
                          Sign up
                      </NavLink>
                  </div>

                  {/* Mobile menu button */}
                  <div className="md:hidden">
                      <button
                          onClick={() => setIsMenuOpen(!isMenuOpen)}
                          className="text-gray-700 hover:text-purple-600 transition-colors duration-200"
                      >
                          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                      </button>
                  </div>
              </div>

              {/* Mobile Navigation */}
              {isMenuOpen && (
                  <div className="md:hidden">
                      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                          {navigation.map((item) => (
                              <NavLink
                                  key={item.name}
                                  to={item.href}
                                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                                      isActive(item.href)
                                          ? "text-purple-600 bg-purple-50"
                                          : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                                  }`}
                                  onClick={() => setIsMenuOpen(false)}
                              >
                                  {item.name}
                              </NavLink>
                          ))}
                          <div className="px-3 py-2 space-y-2">
                              <button className="w-full flex items-center justify-center space-x-2 text-purple-600 hover:text-purple-700 py-2 transition-colors duration-200">
                                  <Calendar className="h-4 w-4" />
                                  <span className="text-sm font-medium">Appointment</span>
                              </button>
                              <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors duration-200">
                                  Sign up
                              </button>
                          </div>
                      </div>
                  </div>
              )}
          </div>
      </header>
  );
};

export default Header;