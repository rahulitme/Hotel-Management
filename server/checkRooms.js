import mongoose from 'mongoose'
import Room from './models/Room.js'
import dotenv from 'dotenv'

dotenv.config()

const checkRooms = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel-booking')
    console.log('Connected to MongoDB')

    const rooms = await Room.find({})
    
    console.log(`\n🏨 Total rooms in database: ${rooms.length}`)
    
    if (rooms.length > 0) {
      console.log('\n📋 Room details:')
      rooms.forEach((room, index) => {
        console.log(`${index + 1}. Room ID: ${room._id}`)
        console.log(`   Name: ${room.name}`)
        console.log(`   Price: $${room.price}`)
        console.log(`   Room Number: ${room.roomNumber}`)
        console.log('---')
      })
    } else {
      console.log('\n❌ No rooms found in database')
    }

    process.exit(0)
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

checkRooms()
