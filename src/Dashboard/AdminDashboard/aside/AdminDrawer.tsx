import { Link } from "react-router"
import { adminDrawerData } from "./drawerData"
import { IoCloseSharp } from "react-icons/io5";

const AdminDrawer = ({ onClose }: { onClose?: () => void }) => {
  return (
    <div className="p-4">
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-center text-white p-4 border-b-2 border-gray-700">
            Dashboard Menu
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden text-white hover:text-red-500"
            title="Close menu"
          >
            <IoCloseSharp size={24} />
          </button>
        )}
        </div>
        <ul className="flex flex-col gap-8">
            {
                adminDrawerData.map((item) => (
                    <li key={item.id}>
                        <Link to={item.link}
                        className="flex text-3xl space-x-3 border-b-2 border-transparent hover:border-blue-400 text-gray-100 hover:bg-gray-700 p-4 m-4">
                        <item.icon />
                        <span className="text-2xl text-gray-100">
                        {item.name}
                        </span>
                        </Link>
                    </li>
                ))
            }
        </ul>
        </div>
  )
}

export default AdminDrawer