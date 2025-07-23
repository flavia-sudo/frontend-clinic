import { FaCalendarCheck } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { FaUserCheck } from "react-icons/fa6";
import type React from "react";

export type DrawerData = {
    id: string;
    name: string;
    icon: React.ComponentType;
    link: string;
}

export const adminDrawerData: DrawerData[] = [
    {
        id: "doctors",
        name: "Doctors",
        icon: FaUserDoctor,
        link: "doctors"
    },
    {
        id: "appointments",
        name: "Appointments",
        icon: FaCalendarCheck,
        link: "appointments"
    },
    {
        id: "users",
        name: "Users",
        icon: FiUsers,
        link: "users"
    },
    {
        id: "profile",
        name: "Profile",
        icon: FaUserCheck,
        link: "profile"
    },
]