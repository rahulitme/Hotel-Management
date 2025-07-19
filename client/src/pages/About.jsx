import React from 'react'

const About = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">About Our Hotel</h1>
        <p className="text-xl text-gray-600">
          Discover the story behind our commitment to exceptional hospitality
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 1985, our hotel has been a beacon of luxury and comfort in the heart of the city. 
            We pride ourselves on providing an unforgettable experience for every guest who walks through our doors.
          </p>
          <p className="text-gray-600 mb-4">
            Over the years, we have continuously evolved to meet the changing needs of modern travelers 
            while maintaining our commitment to traditional hospitality values.
          </p>
          <p className="text-gray-600">
            Today, we stand as one of the premier destinations for business travelers, families, and 
            couples seeking a perfect blend of comfort, convenience, and elegance.
          </p>
        </div>
        <div>
          <img
            src="/image.png"
            alt="Hotel exterior"
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold mb-2">Award-Winning Service</h3>
            <p className="text-gray-600">
              Recognized for excellence in hospitality and customer service
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-xl font-semibold mb-2">Prime Location</h3>
            <p className="text-gray-600">
              Located in the heart of the city with easy access to attractions
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="text-xl font-semibold mb-2">Luxury Amenities</h3>
            <p className="text-gray-600">
              State-of-the-art facilities and premium services
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
        <div className="bg-blue-50 p-8 rounded-lg text-center">
          <p className="text-lg text-gray-700 leading-relaxed">
            "To create memorable experiences for our guests through exceptional service, 
            comfortable accommodations, and attention to detail. We strive to be more than 
            just a place to stay – we aim to be your home away from home."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Our Values</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
              <span>Exceptional customer service</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
              <span>Attention to detail</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
              <span>Sustainability and responsibility</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2"></span>
              <span>Continuous improvement</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Awards & Recognition</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></span>
              <span>Best Hotel Service Award 2024</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></span>
              <span>Excellence in Hospitality 2023</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></span>
              <span>Top Rated Hotel 2022</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-3 mt-2"></span>
              <span>Sustainability Leader 2021</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About
