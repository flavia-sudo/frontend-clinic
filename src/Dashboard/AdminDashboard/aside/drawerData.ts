import { FaCalendarCheck } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { BsEmojiExpressionlessFill } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { FaPrescriptionBottle } from "react-icons/fa6";
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
        id: "complaints",
        name: "Complaints",
        icon: BsEmojiExpressionlessFill,
        link: "complaints"
    },
    {
        id: "payments",
        name: "Payments",
        icon: FaCalendarCheck,
        link: "payments"
    },
    {
        id: "prescriptions",
        name: "Prescriptions",
        icon: FaPrescriptionBottle,
        link: "prescriptions"
    },
    {
        id: "users",
        name: "Users",
        icon: FiUsers,
        link: "users"
    },
]