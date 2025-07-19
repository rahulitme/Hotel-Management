import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Luxe Hotel
                </span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-md">
                Experience unparalleled luxury and comfort at our world-class hotel. 
                Where every stay becomes an unforgettable memory.
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors duration-300">
                  <span className="text-sm">📘</span>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors duration-300">
                  <span className="text-sm">📷</span>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors duration-300">
                  <span className="text-sm">🐦</span>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors duration-300">
                  <span className="text-sm">💼</span>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/rooms" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 flex items-center group">
                    <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    Our Rooms
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 flex items-center group">
                    <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 flex items-center group">
                    <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/booking" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 flex items-center group">
                    <span className="mr-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    Book Now
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-white">Contact Info</h4>
              <div className="space-y-4 text-gray-400">
                <div className="flex items-start space-x-3">
                  <span className="text-amber-400 mt-1">📍</span>
                  <div>
                    <p>123 Luxury Avenue</p>
                    <p>Downtown District</p>
                    <p>New York, NY 10001</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-amber-400">📞</span>
                  <a href="tel:+15551234567" className="hover:text-amber-400 transition-colors duration-300">
                    +1 (555) 123-4567
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-amber-400">✉️</span>
                  <a href="mailto:info@luxehotel.com" className="hover:text-amber-400 transition-colors duration-300">
                    info@luxehotel.com
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-amber-400">🕒</span>
                  <div>
                    <p>24/7 Reception</p>
                    <p className="text-sm">Always here for you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter Section */}
        <div className="border-t border-slate-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h5 className="text-lg font-semibold text-white mb-2">Stay Updated</h5>
              <p className="text-gray-400">Subscribe for exclusive offers and updates</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 bg-slate-800 text-white placeholder-gray-400 border border-slate-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-r-lg font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-slate-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2025 Luxe Hotel. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-amber-400 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-amber-400 transition-colors duration-300">Terms of Service</a>
              <a href="#" className="hover:text-amber-400 transition-colors duration-300">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
