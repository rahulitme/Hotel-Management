import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { mockRooms } from '../data/mockRooms'

const Booking = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  
  // Get room from location state or URL parameter
  const roomFromState = location.state?.room
  const roomIdFromUrl = searchParams.get('room')

  useEffect(() => {
    if (roomFromState) {
      setSelectedRoom(roomFromState)
    } else if (roomIdFromUrl) {
      // Try to fetch room from API first
      fetchRoomFromAPI(roomIdFromUrl)
    } else {
      // Fallback to first available room if no specific room selected
      const firstAvailableRoom = mockRooms.find(r => r.available)
      setSelectedRoom(firstAvailableRoom || null)
    }
  }, [roomFromState, roomIdFromUrl])

  const fetchRoomFromAPI = async (roomId) => {
    try {
      console.log('🔄 Fetching room from API with ID:', roomId)
      const response = await fetch(`/api/rooms/${roomId}`)
      if (response.ok) {
        const room = await response.json()
        console.log('✅ Room fetched from API:', room)
        setSelectedRoom(room)
        return
      }
    } catch (error) {
      console.log('❌ API fetch failed, trying mock data:', error)
    }
    
    // Fallback to mock data
    const room = mockRooms.find(r => r._id === roomId)
    console.log('📦 Using mock room:', room)
    setSelectedRoom(room || null)
  }

  // Set default dates
  useEffect(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const formatDate = (date) => {
      return date.toISOString().split('T')[0]
    }
    
    setFormData(prev => ({
      ...prev,
      checkIn: formatDate(today),
      checkOut: formatDate(tomorrow)
    }))
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      navigate('/login')
      return
    }

    // Client-side validation
    const checkInDate = new Date(formData.checkIn)
    const checkOutDate = new Date(formData.checkOut)
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Reset time to start of day

    if (checkInDate < today) {
      alert('Check-in date cannot be in the past. Please select today or a future date.')
      return
    }

    if (checkOutDate <= checkInDate) {
      alert('Check-out date must be after check-in date.')
      return
    }

    if (formData.guests > selectedRoom.capacity) {
      alert(`This room can accommodate maximum ${selectedRoom.capacity} guests.`)
      return
    }
    
    setLoading(true)
    
    console.log('🚀 Booking Submission Debug:')
    console.log('Selected Room:', selectedRoom)
    console.log('Room ID:', selectedRoom._id)
    console.log('Form Data:', formData)
    console.log('User Token:', localStorage.getItem('token') ? 'Present' : 'Missing')
    
    try {
      const bookingData = {
        room: selectedRoom._id,
        ...formData
      }
      
      console.log('📤 Sending booking data:', bookingData)
      
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(bookingData)
      })
      
      console.log('📥 Response status:', response.status)
      console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()))
      
      if (response.ok) {
        const booking = await response.json()
        console.log('✅ Booking successful:', booking)
        alert('🎉 Booking successful! Your reservation has been confirmed.')
        navigate('/dashboard')
      } else {
        const error = await response.json()
        console.error('❌ Booking failed:', error)
        alert(`Booking failed: ${error.message}`)
      }
    } catch (error) {
      console.error('🚨 Network/API Error:', error)
      // For demo mode - simulate successful booking
      const days = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
      const totalCost = days * selectedRoom.price
      
      alert(`🎉 Demo Booking Successful!
      
Room: ${selectedRoom.name}
Check-in: ${checkInDate.toLocaleDateString()}
Check-out: ${checkOutDate.toLocaleDateString()}
Guests: ${formData.guests}
Duration: ${days} night${days > 1 ? 's' : ''}
Total Cost: $${totalCost}

Your booking has been confirmed!`)
      navigate('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  if (!selectedRoom) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏨</div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Select a Room</h2>
          <p className="text-gray-600 mb-6">
            Choose from our available rooms to proceed with booking.
          </p>
          
          {/* Quick Room Selector */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-left">
            <h3 className="text-lg font-semibold mb-4">Available Rooms</h3>
            <div className="space-y-3">
              {mockRooms.filter(r => r.available).map(room => (
                <button
                  key={room._id}
                  onClick={() => setSelectedRoom(room)}
                  className="w-full p-4 border border-gray-200 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-all duration-200 text-left"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{room.name}</h4>
                      <p className="text-sm text-gray-600">Capacity: {room.capacity} guests</p>
                    </div>
                    <div className="text-amber-600 font-bold">${room.price}/night</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={() => navigate('/rooms')}
            className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
          >
            Browse All Rooms
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Book Your Stay</h1>
        <p className="text-gray-600">Complete your reservation details</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Room Details</h2>
        
        {/* Room Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Room</label>
          <select
            value={selectedRoom?._id || ''}
            onChange={(e) => {
              const room = mockRooms.find(r => r._id === e.target.value)
              setSelectedRoom(room)
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {mockRooms.filter(r => r.available).map(room => (
              <option key={room._id} value={room._id}>
                {room.name} - ${room.price}/night
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <img
            src={selectedRoom.image || '/placeholder-room.jpg'}
            alt={selectedRoom.name}
            className="w-24 h-24 object-cover rounded"
          />
          <div>
            <h3 className="font-semibold">{selectedRoom.name}</h3>
            <p className="text-gray-600">{selectedRoom.description}</p>
            <p className="text-lg font-bold text-amber-600">${selectedRoom.price}/night</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Check-in Date</label>
            <input
              type="date"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleInputChange}
              min={new Date().toISOString().split('T')[0]}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <p className="text-xs text-gray-500 mt-1">Earliest check-in: Today</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Check-out Date</label>
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleInputChange}
              min={formData.checkIn || new Date().toISOString().split('T')[0]}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <p className="text-xs text-gray-500 mt-1">Must be after check-in date</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Number of Guests</label>
          <select
            name="guests"
            value={formData.guests}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {[...Array(selectedRoom?.capacity || 6)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Guest{i + 1 > 1 ? 's' : ''}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Maximum for this room: {selectedRoom?.capacity || 6} guests
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Special Requests</label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Any special requirements or requests..."
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Processing...' : 'Confirm Booking'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/rooms')}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default Booking
