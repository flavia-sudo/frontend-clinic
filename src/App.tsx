import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import VerifyUser from "./pages/VerifyUser";
import AdminDashboard from "./Dashboard/AdminDashboard/AdminDashboard";
import Doctors from "./Dashboard/AdminDashboard/doctors/Doctors";

function App() {
    return (
          <div className="w-full min-h-screen flex flex-col">
              <Header />
              <main className="w-full flex-grow">
                  <Routes>
                      <Route path="/" element={<Landing />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/verify" element={<VerifyUser />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/admin" element={<AdminDashboard />}>
                        <Route index element={<Doctors />} /> 
                        <Route path="doctors" element={<Doctors />} />
                        {/* <Route path="bookings" element={<Bookings />} /> */}
                        {/* <Route path="settings" element={<Settings />} /> */}
                      </Route>
                      <Route path="*" element={<NotFound />} />
                    </Routes>
              </main>
          </div>
    );
}

export default App;
