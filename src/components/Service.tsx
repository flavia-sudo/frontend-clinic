import { Heart, Stethoscope, Brain, Eye, Users, Clock } from "lucide-react";

const Services = () => {
    const services = [
        {
            icon: Heart,
            title: "Cardiology",
            description: "Comprehensive heart care with advanced diagnostic tools and experienced cardiologists.",
            color: "bg-red-100 text-red-600",
        },
        {
            icon: Stethoscope,
            title: "General Medicine",
            description: "Complete primary care services for all ages with personalized treatment plans.",
            color: "bg-purple-100 text-purple-600",
        },
        {
            icon: Brain,
            title: "Neurology",
            description: "Expert neurological care for brain and nervous system disorders.",
            color: "bg-blue-100 text-blue-600",
        },
        {
            icon: Eye,
            title: "Ophthalmology",
            description: "Advanced eye care services including surgery and vision correction.",
            color: "bg-green-100 text-green-600",
        },
        {
            icon: Users,
            title: "Family Medicine",
            description: "Holistic healthcare for the entire family from infants to seniors.",
            color: "bg-orange-100 text-orange-600",
        },
        {
            icon: Clock,
            title: "Emergency Care",
            description: "24/7 emergency medical services with rapid response times.",
            color: "bg-indigo-100 text-indigo-600",
        },
    ];

    return (
        <section className="w-full py-16 lg:py-24 bg-white">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Our Medical Services
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        We offer a comprehensive range of medical services delivered by our expert healthcare
                        professionals using the latest technology and treatment methods.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const IconComponent = service.icon;
                        return (
                            <div
                                key={index}
                                className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                            >
                                <div
                                    className={`inline-flex p-4 rounded-xl ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <IconComponent className="h-8 w-8" />
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                                    {service.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed">{service.description}</p>

                                <div className="mt-6">
                                    <button className="text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-200 group-hover:underline">
                                        Learn More →
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
