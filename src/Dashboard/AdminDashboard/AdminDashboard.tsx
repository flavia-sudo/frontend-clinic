import { Outlet } from "react-router-dom";
import AdminDrawer from "./aside/AdminDrawer";
import { FaBars } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";

const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 position-relative">
      <header className="flex items-center justify-between px-4 py-4 bg-gray-900 shadow-md text-white md:justify-start">
        <button
          onClick={handleDrawerToggle}
          className={`mr-4 p-2 md:hidden rounded transition duration-300 ${
            drawerOpen ? "bg-red-600 hover:bg-red-700" : "bg-gray-700 hover:bg-gray-800"
          }`}
        >
          {drawerOpen ? <IoCloseSharp size={24} /> : <FaBars size={20} />}
        </button>
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </header>

      <div className="flex flex-1 relative">
        <aside
          className={`max-w-fit min-h-screen bg-gray-800 text-white w-54 transition-transform duration-300 ease-in-out z-40
            ${drawerOpen ? "translate-x-0" : "-translate-x-full"} 
            md:translate-x-0 md:static absolute h-full`}
        >
          <AdminDrawer onClose={() => setDrawerOpen(false)} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-50 min-h-[calc(100vh-64px)] overflow-auto m-0">
            <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
