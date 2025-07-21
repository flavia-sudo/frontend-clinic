import { ArrowRight, Info } from "lucide-react";

const Hero = () => {
    return (
        <section className="w-full relative bg-gradient-to-br from-purple-50 via-white to-purple-100 py-16 lg:py-24">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20"></div>
                <div className="absolute top-32 right-20 w-16 h-16 bg-purple-300 rounded-full opacity-15"></div>
                <div className="absolute bottom-20 left-32 w-12 h-12 bg-purple-400 rounded-full opacity-10"></div>
                <div className="absolute bottom-40 right-10 w-8 h-8 bg-purple-500 rounded-full opacity-20"></div>
            </div>

            <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="text-center lg:text-left">
                        <div className="mb-6">
                            <span className="inline-block text-sm font-semibold text-purple-600 tracking-wider uppercase mb-4">
                                Welcome
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Medical Clinic that <span className="text-purple-600">You can Trust.</span>
                            </h1>
                        </div>

                        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                            Experience exceptional healthcare with our team of dedicated professionals. We provide
                            comprehensive medical services with compassion and expertise you can rely on.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button className="group bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                <span>Book Now</span>
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                            </button>

                            <button className="group border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-all duration-200 flex items-center justify-center space-x-2">
                                <Info className="h-5 w-5" />
                                <span>More Info</span>
                            </button>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative">
                        <div className="relative z-10">
                            <img
                                src="https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg"
                                alt="Professional doctor with stethoscope"
                                className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
