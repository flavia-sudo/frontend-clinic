import { Users, Award, Clock, Heart } from "lucide-react";

const Stats = () => {
    const stats = [
        {
            icon: Users,
            number: "15,000+",
            label: "Happy Patients",
            color: "text-blue-600",
        },
        {
            icon: Award,
            number: "25+",
            label: "Expert Doctors",
            color: "text-green-600",
        },
        {
            icon: Clock,
            number: "24/7",
            label: "Emergency Care",
            color: "text-red-600",
        },
        {
            icon: Heart,
            number: "98%",
            label: "Success Rate",
            color: "text-purple-600",
        },
    ];

    return (
        <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div key={index} className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                                    <IconComponent className="h-8 w-8 text-black" />
                                </div>
                                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.number}</div>
                                <div className="text-purple-100 font-medium">{stat.label}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Stats;
