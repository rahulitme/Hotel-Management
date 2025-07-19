import mongoose from 'mongoose'
import Booking from './models/Booking.js'
import User from './models/User.js'
import dotenv from 'dotenv'

dotenv.config()

const checkBookings = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel-booking')
    console.log('Connected to MongoDB')

    const bookings = await Booking.find({})
      .populate('user', 'firstName lastName email')
      .populate('room', 'name')
    
    console.log(`\n📊 Total bookings in database: ${bookings.length}`)
    
    if (bookings.length > 0) {
      console.log('\n📋 Booking details:')
      bookings.forEach((booking, index) => {
        console.log(`${index + 1}. Booking ID: ${booking._id}`)
        console.log(`   User: ${booking.user?.email || 'No user'}`)
        console.log(`   Room: ${booking.room?.name || 'No room'}`)
        console.log(`   Check-in: ${booking.checkIn}`)
        console.log(`   Check-out: ${booking.checkOut}`)
        console.log(`   Status: ${booking.status}`)
        console.log(`   Created: ${booking.createdAt}`)
        console.log('---')
      })
    } else {
      console.log('\n❌ No bookings found in database')
    }

    const users = await User.find({}, 'firstName lastName email')
    console.log(`\n👥 Total users in database: ${users.length}`)
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email} (${user.firstName} ${user.lastName})`)
    })

    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

checkBookings()
