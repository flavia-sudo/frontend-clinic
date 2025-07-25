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
import Appointments from "./Dashboard/AdminDashboard/appointments/Appointment";
import Complaints from "./Dashboard/AdminDashboard/complaints/Complaint";
import Payments from "./Dashboard/AdminDashboard/payments/Payment";
import Users from "./Dashboard/AdminDashboard/manageUsers/Users";
import Prescriptions from "./Dashboard/AdminDashboard/prescriptions/Prescription";
import Transactions from "./Dashboard/AdminDashboard/transactions/Transaction";
import UserDashboard from "./Dashboard/UserDashboard/UserDashboard";
import UserAppointment from "./Dashboard/UserDashboard/appointment/UserAppointment";
import UserComplaints from "./Dashboard/UserDashboard/complaints/UserComplaints";
import UserPrescription from "./Dashboard/UserDashboard/prescription/UserPrescription";
import DoctorDashboard from "./Dashboard/DoctorDashboard/DoctorDashboard";
import DoctorAppointment from "./Dashboard/DoctorDashboard/appointment/DoctorAppointment";
import DoctorPrescription from "./Dashboard/DoctorDashboard/prescription/DoctorPrescription";

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
                        <Route path="appointments" element={<Appointments />} />
                        <Route path="complaints" element={<Complaints />} />
                        <Route path="payments" element={<Payments />} />
                        <Route path="users" element={<Users />} />
                        <Route path='prescriptions' element={<Prescriptions />} />
                        <Route path='transactions' element={<Transactions />} />
                      </Route>
                      <Route path="/dashboard" element={<UserDashboard />}>
                        <Route index element={<UserAppointment />} /> 
                        <Route path="appointments" element={<UserAppointment />} />
                        <Route path="complaints" element={<UserComplaints />} />
                        <Route path="prescriptions" element={<UserPrescription />} />
                      </Route>
                      <Route path="/doctor" element={<DoctorDashboard />}>
                        <Route index element={<DoctorAppointment />} /> 
                        <Route path="appointments" element={<DoctorAppointment />} />
                        <Route path="prescriptions" element={<DoctorPrescription />} />
                      </Route>
                      <Route path="*" element={<NotFound />} />
                    </Routes>
              </main>
          </div>
    );
}

export default App;
