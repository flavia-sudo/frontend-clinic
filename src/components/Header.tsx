import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { logout } from "../features/login/authSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const token = localStorage.getItem("Token");
    const user = JSON.parse(localStorage.getItem("User") || "{}");
    const isAdmin = user.role === "admin";
    const isDoctor = user.role === "doctor";
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoggedIn(!!token);
    }, [token, user]);

    const handleLogout = () => {
        localStorage.removeItem("Token");
        localStorage.removeItem("User");
        dispatch(logout());
        setIsLoggedIn(false);
        setIsMenuOpen(false);
        navigate("/login");
    };

    const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `${
        isActive ? "text-purple-600 underline" : "text-gray-700 hover:text-purple-600"
    } text-base lg:text-lg font-semibold transition-colors`;

  return (
      <header className="w-full bg-white shadow-sm sticky top-0 z-50" data-testid="header" >
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                  {/* Logo */}
                  <NavLink to="/" className="flex items-center space-x-2" data-testid="logo">
                      <div className="bg-purple-600 p-2 rounded-lg">
                          <Phone className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xl font-bold text-gray-900">MediPulse</span>
                  </NavLink>

                  {/* Desktop Navigation */}
                  <nav className="hidden md:flex space-x-8">
                    <NavLink to="/" className={getLinkClass} data-testid="desktop-home">
                        Home
                    </NavLink>
                    <NavLink to="/about" className={getLinkClass} data-testid="desktop-about">
                        About
                    </NavLink>
                    {isLoggedIn && (
                        <NavLink to="/dashboard" className={getLinkClass}  data-testid="desktop-dashboard" >
                            Dashboard
                        </NavLink>
                    )}
                    {isDoctor && (
                        <NavLink to="/doctor" className={getLinkClass} data-testid="desktop-doctor">
                            Doctor
                        </NavLink>
                    )}
                    {isAdmin && (
                        <NavLink to="/admin" className={getLinkClass} data-testid="desktop-admin">
                            Admin
                        </NavLink>
                    )}
                  </nav>

                  {/* Desktop CTA Buttons */}
                  <div className="hidden md:flex items-center space-x-4">
                        {isLoggedIn ? (
                              <>
                                <NavLink
                                    to="/profile"
                                     data-testid="desktop-profile"
                                    className="px-4 py-2 border rounded-md text-gray-700 hover:border-purple-600 transition-colors"
                                >
                                    Profile
                                </NavLink>
                                <button
                                    onClick={handleLogout}
                                     data-testid="desktop-logout"
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                     data-testid="desktop-login"
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/register"
                                     data-testid="desktop-register"
                                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                                >
                                    Register
                                </NavLink>
                            </>
                        )}
                  </div>

                  {/* Mobile menu button */}
                  <div className="md:hidden">
                      <button
                          onClick={() => setIsMenuOpen(!isMenuOpen)}
                          data-testid="mobile-menu-button"
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
                        <NavLink to="/"  data-testid="mobile-home" className={`${getLinkClass} block text-black`} onClick={() => setIsMenuOpen(false)}>
                            Home
                        </NavLink>
                        <NavLink
                            to="/about"
                             data-testid="mobile-about"
                            className={`${getLinkClass} block text-black`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </NavLink>
                        {isLoggedIn && (
                            <NavLink
                                to="/dashboard"
                                 data-testid="mobile-dashboard"
                                className={`${getLinkClass} block text-black`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Dashboard
                            </NavLink>
                        )}
                        {isDoctor && (
                            <NavLink
                                to="/doctor"
                                 data-testid="mobile-doctor"
                                className={`${getLinkClass} block text-black`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Doctor
                            </NavLink>
                        )}
                        {isAdmin && (
                            <NavLink
                                to="/admin"
                                 data-testid="mobile-admin"
                                className={`${getLinkClass} block text-black`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Admin
                            </NavLink>
                        )}
                          <div className="px-3 py-2 space-y-2">
                    {isLoggedIn ? (
                        <>
                            <NavLink
                                to="/profile"
                                 data-testid="mobile-profile"
                                className="block border px-4 py-2 rounded text-gray-700 hover:border-purple-500 transition-colors w-full"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Profile
                            </NavLink>
                            <button
                                 data-testid="mobile-logout"
                                className="block w-full text-left bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/login"
                                 data-testid="mobile-login"
                                className="block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                 data-testid="mobile-register"
                                className="block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Register
                            </NavLink>
                        </>
                    )}
                          </div>
                      </div>
                  </div>
              )}
          </div>
      </header>
  );
};

export default Header;