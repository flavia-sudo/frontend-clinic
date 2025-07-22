import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import VerifyUser from "./pages/VerifyUser";

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
                      <Route path="/admin/dashboard" element={<AdminDashboard />} />
                      <Route path="*" element={<NotFound />} />                 
                    </Routes>
              </main>
          </div>
    );
}

export default App;
