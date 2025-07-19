import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockRooms } from '../data/mockRooms'

const RoomDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRoom()
  }, [id])

  const fetchRoom = async () => {
    try {
      // Try API first
      const response = await fetch(`/api/rooms/${id}`)
      if (response.ok) {
        const data = await response.json()
        setRoom(data)
      } else {
        throw new Error('API not available')
      }
    } catch (error) {
      console.log('API not available, using mock data for room:', id)
      // Use mock data when API is not available
      const mockRoom = mockRooms.find(room => room._id === id)
      setRoom(mockRoom || null)
    } finally {
      setLoading(false)
    }
  }

  const handleBookNow = () => {
    navigate('/booking', { state: { room } })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading room details...</div>
      </div>
    )
  }

  if (!room) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Room not found</h2>
        <button
          onClick={() => navigate('/rooms')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Back to Rooms
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src={room.image || '/placeholder-room.jpg'}
            alt={room.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{room.name}</h1>
            <p className="text-gray-600">{room.description}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Price</h3>
              <p className="text-2xl font-bold text-blue-600">${room.price}/night</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Capacity</h3>
              <p className="text-xl">{room.capacity} guests</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Amenities</h3>
            <ul className="grid grid-cols-2 gap-2">
              {room.amenities?.map((amenity, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <span className={`px-4 py-2 rounded-full text-sm ${
              room.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {room.available ? 'Available' : 'Currently Booked'}
            </span>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={handleBookNow}
              disabled={!room.available}
              className={`flex-1 py-3 rounded-lg font-semibold ${
                room.available
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {room.available ? 'Book Now' : 'Not Available'}
            </button>
            <button
              onClick={() => navigate('/rooms')}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back to Rooms
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomDetail
