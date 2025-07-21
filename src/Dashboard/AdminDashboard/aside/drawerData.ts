import { TbBrandBooking } from "react-icons/tb";
import { FaUserDoctor } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { FaUserCheck } from "react-icons/fa6";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
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
        id: "bookings",
        name: "Bookings",
        icon: TbBrandBooking,
        link: "bookings"
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
    {
        id: "analytics",
        name: "Analytics",
        icon: TbBrandGoogleAnalytics,
        link: "analytics"
    },
]