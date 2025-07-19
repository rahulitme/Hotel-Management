import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'

const Dashboard = () => {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchBookings()
    }
  }, [user])

  const fetchBookings = async () => {
    console.log('🔄 Fetching user bookings...')
    console.log('User:', user)
    console.log('Token:', localStorage.getItem('token') ? 'Present' : 'Missing')
    
    try {
      const response = await fetch('/api/bookings/user', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      console.log('📥 Bookings response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('✅ Bookings fetched:', data)
        setBookings(data)
      } else {
        const error = await response.text()
        console.error('❌ Failed to fetch bookings:', error)
      }
    } catch (error) {
      console.error('🚨 Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const cancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const response = await fetch(`/api/bookings/${bookingId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        
        if (response.ok) {
          setBookings(bookings.filter(booking => booking._id !== bookingId))
          alert('Booking cancelled successfully')
        }
      } catch (error) {
        console.error('Error cancelling booking:', error)
        alert('Failed to cancel booking')
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user?.firstName}!</h1>
        <p className="text-gray-600">Manage your bookings and account settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
          <p className="text-3xl font-bold text-blue-600">{bookings.length}</p>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Active Bookings</h3>
          <p className="text-3xl font-bold text-green-600">
            {bookings.filter(b => b.status === 'confirmed').length}
          </p>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Upcoming Stays</h3>
          <p className="text-3xl font-bold text-purple-600">
            {bookings.filter(b => new Date(b.checkIn) > new Date()).length}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Your Bookings</h2>
        
        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{booking.room?.name}</h3>
                    <p className="text-gray-600">{booking.room?.description}</p>
                    <div className="mt-2 space-y-1">
                      <p><strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
                      <p><strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
                      <p><strong>Guests:</strong> {booking.guests}</p>
                      <p><strong>Total:</strong> ${booking.totalAmount}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                    
                    {booking.status === 'confirmed' && new Date(booking.checkIn) > new Date() && (
                      <button
                        onClick={() => cancelBooking(booking._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
                
                {booking.specialRequests && (
                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <strong>Special Requests:</strong> {booking.specialRequests}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No bookings found</p>
            <a
              href="/rooms"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Browse Rooms
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
