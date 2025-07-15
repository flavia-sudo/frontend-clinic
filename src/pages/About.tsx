import React from 'react';
import { Award, Users, Heart, Target, MapPin, Phone, Mail, Star } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      specialty: 'Cardiology',
      image: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg',
      experience: '15+ years'
    },
    {
      name: 'Dr. Michael Chen',
      role: 'Senior Physician',
      specialty: 'Internal Medicine',
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg',
      experience: '12+ years'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Neurologist',
      specialty: 'Neurology',
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg',
      experience: '10+ years'
    },
    {
      name: 'Dr. James Wilson',
      role: 'Emergency Medicine',
      specialty: 'Emergency Care',
      image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg',
      experience: '8+ years'
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: 'Joint Commission Accredited',
      description: 'Recognized for excellence in patient safety and quality care'
    },
    {
      icon: Star,
      title: '5-Star Patient Rating',
      description: 'Consistently rated excellent by our patients'
    },
    {
      icon: Users,
      title: 'Board-Certified Physicians',
      description: 'All our doctors are board-certified specialists'
    },
    {
      icon: Heart,
      title: 'Community Health Leader',
      description: 'Serving our community for over 20 years'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                About <span className="text-purple-600">MediCare</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                For over two decades, MediCare has been the trusted healthcare provider
                in our community. We combine cutting-edge medical technology with
                compassionate care to deliver exceptional health outcomes.
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">20+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">15K+</div>
                  <div className="text-sm text-gray-600">Happy Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">25+</div>
                  <div className="text-sm text-gray-600">Expert Doctors</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg"
                alt="Modern medical facility"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-purple-50 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To provide exceptional, compassionate healthcare services that improve
                the quality of life for individuals and families in our community. We
                are committed to advancing medical care through innovation, education,
                and a patient-centered approach.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To be the leading healthcare provider in our region, recognized for
                clinical excellence, innovative treatments, and outstanding patient
                experience. We envision a healthier community where everyone has
                access to quality medical care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Recognition and certifications that demonstrate our commitment to excellence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                    <IconComponent className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our board-certified physicians and healthcare professionals are dedicated
              to providing you with the highest quality medical care.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-purple-600 font-medium mb-1">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-2">{member.specialty}</p>
                  <p className="text-sm text-gray-500">{member.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">State-of-the-Art Facility</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our modern medical facility is equipped with the latest technology and
                designed with patient comfort in mind. From advanced diagnostic equipment
                to comfortable patient rooms, every detail is crafted to enhance your
                healthcare experience.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700">Advanced diagnostic imaging center</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700">Modern surgical suites</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700">Comfortable patient rooms</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700">24/7 emergency department</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg"
                alt="Medical equipment"
                className="rounded-lg shadow-md"
              />
              <img
                src="https://images.pexels.com/photos/3786126/pexels-photo-3786126.jpeg"
                alt="Hospital corridor"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience Quality Healthcare?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Schedule an appointment today and discover why thousands of patients trust MediCare
            for their healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Book Appointment
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Contact Us
            </button>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-purple-100">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>info@medicare.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>123 Healthcare Ave</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;