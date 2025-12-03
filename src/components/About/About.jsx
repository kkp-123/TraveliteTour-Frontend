import React from "react";
import { FaGlobeAsia, FaUsers, FaPlane, FaRegSmileBeam } from "react-icons/fa";

export default function About() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <div className="relative w-full h-[60vh]">

        <video
          src="/assets/images/tourvideo1.mp4"
          className="w-full h-full object-cover absolute"
          autoPlay
          loop
          muted
          playsInline
        >
        </video>

    
        <h1 className="relative text-white text-4xl md:text-6xl font-extrabold drop-shadow-lg text-center top-35">
          Explore Incredible India with TraveLite
        </h1>
      </div>

      {/* Our Story Section */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-orange-600">
          Our Story
        </h2>
        <p className="text-center max-w-3xl mx-auto text-lg leading-relaxed">
          TraveLite is a passionate travel brand dedicated to creating unforgettable journeys across India.
          From the Himalayan peaks to the beaches of Goa, and the heritage cities to tranquil backwaters, we bring you authentic experiences that stay with you forever.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12 items-center">
          <img
            src="/assets/images/tour1.jpeg"
            alt="Travel India"
            className="rounded-2xl shadow-xl w-100"
          />

          <div className="space-y-4 text-lg leading-relaxed">
            <p>
              Since our beginning, our focus has been on offering **affordable, safe, and memorable trips across India**.
              Every package is carefully curated to showcase the best of culture, adventure, and natural beauty.
            </p>
            <p>
              Our mission: <strong>help travellers explore the wonders of India effortlessly and authentically</strong>.
            </p>
            <p>
              Whether you travel solo, with family, or in a group, we ensure every journey is seamless, exciting, and stress-free.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-orange-600">
          Why Choose TraveLite?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 max-w-6xl mx-auto px-6">
          <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition">
            <FaPlane className="text-4xl text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Seamless Travel</h3>
            <p className="text-gray-600">Well-planned trips with hassle-free bookings and transport.</p>
          </div>

          <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition">
            <FaGlobeAsia className="text-4xl text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Explore India</h3>
            <p className="text-gray-600">Discover the best destinations—from mountains to beaches and heritage sites.</p>
          </div>

          <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition">
            <FaUsers className="text-4xl text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Guides</h3>
            <p className="text-gray-600">Local guides providing authentic experiences and rich cultural insights.</p>
          </div>

          <div className="p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition">
            <FaRegSmileBeam className="text-4xl text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Happy Travellers</h3>
            <p className="text-gray-600">Thousands of satisfied customers explore India with us every year.</p>
          </div>
        </div>
      </section>



    </div>
  );
}
