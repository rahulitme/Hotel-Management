import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const features = [
    {
      icon: "🏨",
      title: "Luxury Accommodations",
      description: "Spacious suites and rooms with premium amenities, marble bathrooms, and stunning city views"
    },
    {
      icon: "🍽️",
      title: "Gourmet Dining",
      description: "Award-winning restaurants featuring world-class chefs and international cuisine"
    },
    {
      icon: "💆",
      title: "Spa & Wellness",
      description: "Full-service spa with massage therapy, fitness center, and wellness programs"
    },
    {
      icon: "🏊",
      title: "Recreation",
      description: "Rooftop pool, fitness center, and exclusive access to nearby golf courses"
    },
    {
      icon: "🚗",
      title: "Concierge Services",
      description: "24/7 concierge, valet parking, and personalized travel arrangements"
    },
    {
      icon: "📶",
      title: "Business Center",
      description: "High-speed WiFi, meeting rooms, and full business services for corporate travelers"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Luxury Redefined
              <span className="block bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Experience Excellence
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Immerse yourself in unparalleled comfort and sophistication at our world-class hotel, 
              where every detail is crafted for your perfect stay.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/rooms"
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-amber-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Rooms
              </Link>
              <Link
                to="/booking"
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                Book Your Stay
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating elements for visual appeal */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Unmatched Amenities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover a world of luxury with our comprehensive range of premium services and facilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl sm:text-5xl font-bold text-amber-400">500+</div>
              <div className="text-xl text-gray-300">Luxury Rooms</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl sm:text-5xl font-bold text-amber-400">50+</div>
              <div className="text-xl text-gray-300">Countries Served</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl sm:text-5xl font-bold text-amber-400">25</div>
              <div className="text-xl text-gray-300">Years Experience</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl sm:text-5xl font-bold text-amber-400">98%</div>
              <div className="text-xl text-gray-300">Guest Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready for Your Perfect Getaway?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of satisfied guests who have made unforgettable memories at our hotel. 
            Book your luxury experience today and discover what makes us extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Book Your Stay Now
            </Link>
            <Link
              to="/contact"
              className="bg-transparent text-white px-8 py-4 rounded-full font-semibold text-lg border-2 border-white hover:bg-white hover:text-orange-600 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
