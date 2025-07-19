import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { mockRooms } from '../data/mockRooms'

const Rooms = () => {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [usingMockData, setUsingMockData] = useState(false)

  useEffect(() => {
    // Try API first, fall back to mock data if unavailable
    console.log('Attempting to fetch rooms from API...')
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    console.log('🔄 Attempting to fetch rooms from API...')
    try {
      const response = await fetch('/api/rooms')
      console.log('📥 API response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('✅ API rooms fetched successfully:', data.length, 'rooms')
        console.log('First room sample:', data[0])
        setRooms(data)
        setUsingMockData(false)
      } else {
        throw new Error(`API returned status ${response.status}`)
      }
    } catch (error) {
      console.error('❌ API fetch failed:', error)
      console.log('🔄 Falling back to mock data:', mockRooms.length, 'rooms')
      console.log('Mock room sample:', mockRooms[0])
      setRooms(mockRooms)
      setUsingMockData(true)
    } finally {
      setLoading(false)
    }
  }

  const filteredRooms = rooms.filter(room => {
    // Debug logging
    console.log(`Filtering room: ${room.name}, price: ${room.price}, available: ${room.available}`)
    
    // Apply availability filter
    if (filter === 'available' && !room.available) {
      console.log(`  - Filtered out: not available`)
      return false
    }
    
    // Apply room type filter (luxury means price >= 200 OR luxury type)
    if (filter === 'luxury' && room.price < 200 && room.type !== 'luxury') {
      console.log(`  - Filtered out: not luxury`)
      return false
    }
    
    // Apply price range filter
    if (priceRange === 'budget' && room.price > 150) {
      console.log(`  - Filtered out: price ${room.price} > 150`)
      return false
    }
    if (priceRange === 'mid' && (room.price < 150 || room.price > 300)) {
      console.log(`  - Filtered out: price ${room.price} not in mid range`)
      return false
    }
    if (priceRange === 'luxury' && room.price < 300) {
      console.log(`  - Filtered out: price ${room.price} < 300`)
      return false
    }
    
    console.log(`  - ✅ Room passed all filters`)
    return true
  })
  
  console.log(`Filter results: ${filteredRooms.length} rooms found out of ${rooms.length} total rooms`)
  console.log(`Current filters - Type: ${filter}, Price: ${priceRange}`)

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading our beautiful rooms...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Luxury Accommodations
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our collection of beautifully designed rooms and suites, 
            each offering a unique blend of comfort, style, and modern amenities.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Mock Data Banner */}
          {usingMockData && (
            <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center">
                <span className="text-amber-600 text-sm">ℹ️</span>
                <p className="ml-2 text-sm text-amber-800">
                  Demo Mode: Showing sample rooms. Backend API connection will be established soon.
                </p>
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Filter:</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="all">All Rooms</option>
                  <option value="available">Available Only</option>
                  <option value="luxury">Premium & Luxury</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Price Range:</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="all">All Prices</option>
                  <option value="budget">Budget ($150 or less)</option>
                  <option value="mid">Mid-Range ($150 - $300)</option>
                  <option value="luxury">Luxury ($300+)</option>
                </select>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.map((room) => (
                <div key={room._id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img
                      src={room.image || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'}
                      alt={room.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        room.available 
                          ? 'bg-green-500 text-white' 
                          : 'bg-red-500 text-white'
                      }`}>
                        {room.available ? 'Available' : 'Booked'}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-bold text-gray-800">
                          {room.capacity} guests
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
                        {room.name}
                      </h3>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-amber-600">
                          ${room.price}
                        </div>
                        <div className="text-sm text-gray-500">per night</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {room.description || "Experience ultimate comfort in this beautifully appointed room featuring modern amenities, elegant furnishings, and stunning views."}
                    </p>
                    
                    {/* Amenities */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(room.amenities || ['WiFi', 'AC', 'TV', 'Mini Bar']).slice(0, 4).map((amenity) => (
                        <span key={amenity} className="px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded-full border border-amber-200">
                          {amenity}
                        </span>
                      ))}
                      {(room.amenities || []).length > 4 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{(room.amenities || []).length - 4} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex gap-3">
                      <Link
                        to={`/rooms/${room._id}`}
                        className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-center py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        View Details
                      </Link>
                      <Link
                        to={`/booking?room=${room._id}`}
                        className="px-6 py-3 border-2 border-amber-500 text-amber-600 rounded-xl font-semibold hover:bg-amber-500 hover:text-white transition-all duration-300"
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏨</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Rooms Found</h3>
              <p className="text-gray-600 mb-6">
                {filter !== 'all' || priceRange !== 'all' 
                  ? "No rooms match your current filters. Try adjusting your search criteria." 
                  : "No rooms available at the moment. Please check back later."}
              </p>
              {(filter !== 'all' || priceRange !== 'all') && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 mb-4">
                    Current filters: {filter !== 'all' && `Type: ${filter}`} {priceRange !== 'all' && `Price: ${priceRange}`}
                  </p>
                  <button
                    onClick={() => {
                      setFilter('all')
                      setPriceRange('all')
                    }}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Need Help Choosing the Perfect Room?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Our concierge team is available 24/7 to help you find the ideal accommodation for your stay.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
            >
              Contact Concierge
            </Link>
            <a
              href="tel:+1234567890"
              className="bg-transparent text-white px-8 py-3 rounded-xl font-semibold border-2 border-white hover:bg-white hover:text-slate-900 transition-all duration-300"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Rooms
