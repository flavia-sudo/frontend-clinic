import type React from 'react';
import { FaCalendarCheck, FaPrescriptionBottle } from 'react-icons/fa';

export type DrawerData = {
    id: string;
    name: string;
    icon: React.ComponentType;
    link: string;
}

export const userDrawerData: DrawerData[] = [
    {
        id: "appointments",
        name: "Appointments",
        icon: FaCalendarCheck,
        link: "appointments"
    },
    {
        id: "prescriptions",
        name: "Prescriptions",
        icon: FaPrescriptionBottle,
        link: "prescriptions"
    },
]