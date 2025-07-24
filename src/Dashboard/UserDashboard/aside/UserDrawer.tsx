import { userDrawerData } from "./drawerData";
import { NavLink } from "react-router-dom";

const UserDrawer = () => {
    return (
        <div>
            <h2 className="text-xl font-bold text-center text-white border-b-2 border-gray-700">Dashboard Menu</h2>
            <ul className="flex flex-col gap-2">
                {userDrawerData.map((item) => (
                    <li key={item.id}>
                        <NavLink to={item.link} className="flex text-xl space-x-3 border-b-2 border-transparent hover:border-blue-400 text-gray-100 hover:bg-gray-700  m-2">
                            <item.icon />
                            <span className="text-xl text-gray-100">{item.name}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserDrawer