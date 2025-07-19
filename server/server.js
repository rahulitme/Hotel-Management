import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

// Import routes
import roomRoutes from './routes/rooms.js'
import authRoutes from './routes/auth.js'
import bookingRoutes from './routes/bookings.js'

// Load environment variables
dotenv.config()

// Debug environment variables
console.log('🔧 Environment Variables Check:')
console.log('PORT:', process.env.PORT)
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Present' : 'Missing')
console.log('JWT_EXPIRE:', process.env.JWT_EXPIRE)
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Present' : 'Missing')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/rooms', roomRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/bookings', bookingRoutes)

// Basic contact route
app.post('/api/contact', (req, res) => {
  console.log('Contact form submission:', req.body)
  res.json({ message: 'Message received successfully' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

const PORT = process.env.PORT || 5000

// Connect to MongoDB with improved error handling
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...')
    console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Atlas URI provided' : 'Using local fallback')
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel-booking', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    
    console.log('✅ Connected to MongoDB successfully')
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    console.log('💡 Please check:')
    console.log('1. MongoDB Atlas credentials are correct')
    console.log('2. IP address is whitelisted (0.0.0.0/0 for all IPs)')
    console.log('3. Database user has read/write permissions')
    process.exit(1)
  }
}

connectDB()
