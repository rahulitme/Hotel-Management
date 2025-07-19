import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Room from './models/Room.js'
import User from './models/User.js'
import bcrypt from 'bcryptjs'

dotenv.config()

const sampleRooms = [
  {
    name: 'Deluxe Ocean View Suite',
    description: 'Spacious suite with panoramic ocean views, king-size bed, separate living area, and premium amenities. Perfect for a romantic getaway or business travel.',
    price: 299,
    capacity: 2,
    amenities: ['Ocean View', 'King Bed', 'WiFi', 'Mini Bar', 'Balcony', 'Room Service'],
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    available: true,
    roomNumber: 'DS001'
  },
  {
    name: 'Executive Business Room',
    description: 'Modern room designed for business travelers with ergonomic workspace, high-speed internet, and access to executive lounge.',
    price: 189,
    capacity: 2,
    amenities: ['Work Desk', 'WiFi', 'Coffee Machine', 'City View', 'Executive Lounge'],
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    available: true,
    roomNumber: 'EX001'
  },
  {
    name: 'Family Garden Villa',
    description: 'Spacious villa with garden access, perfect for families. Features two bedrooms, living area, and private patio.',
    price: 349,
    capacity: 4,
    amenities: ['Garden View', 'Two Bedrooms', 'Kitchenette', 'Private Patio', 'Family Friendly'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    available: true,
    roomNumber: 'FR001'
  },
  {
    name: 'Classic Comfort Room',
    description: 'Comfortable and well-appointed room with modern amenities and city views. Perfect for business or leisure travelers.',
    price: 150,
    capacity: 2,
    amenities: ['City View', 'WiFi', 'Work Desk', 'Air Conditioning', 'Room Service'],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2158&q=80',
    available: true,
    roomNumber: 'CC001'
  },
  {
    name: 'Presidential Suite',
    description: 'Ultimate luxury experience with panoramic views, premium amenities, and personalized service. The pinnacle of elegance.',
    price: 599,
    capacity: 4,
    amenities: ['Panoramic View', 'Butler Service', 'Jacuzzi', 'Private Dining', 'Premium Bar'],
    image: 'https://images.unsplash.com/photo-1578774204375-61a6de2a8c83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    available: true,
    roomNumber: 'PS001'
  },
  {
    name: 'Budget Traveler Room',
    description: 'Clean, comfortable, and affordable accommodation with all essential amenities for the budget-conscious traveler.',
    price: 89,
    capacity: 2,
    amenities: ['WiFi', 'Private Bathroom', 'Air Conditioning', 'Daily Housekeeping'],
    image: 'https://images.unsplash.com/photo-1631049552240-59c37f38802b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    available: true,
    roomNumber: 'BT001'
  }
]

const sampleAdmin = {
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@hotel.com',
  password: 'admin123',
  role: 'admin'
}

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel-booking')
    console.log('Connected to MongoDB')

    // Clear existing data
    await Room.deleteMany({})
    await User.deleteMany({})
    console.log('Cleared existing data')

    // Create sample rooms
    const rooms = await Room.insertMany(sampleRooms)
    console.log(`Created ${rooms.length} sample rooms`)

    // Create admin user
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(sampleAdmin.password, salt)
    
    const admin = await User.create({
      ...sampleAdmin,
      password: hashedPassword
    })
    console.log('Created admin user')

    console.log('Database seeded successfully!')
    console.log('Admin credentials: admin@hotel.com / admin123')
    
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
