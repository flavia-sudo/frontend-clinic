import React from "react";
import Hero from "../components/Hero";
import Services from "../components/Service";
import Stats from "../components/Stats";
import Footer from "../components/Footer";

const Landing = () => {
    return (
        <div>
            <Hero />
            <Services />
            <Stats />
            <Footer />
        </div>
    );
};

export default Landing;
