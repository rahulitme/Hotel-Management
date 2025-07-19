import Booking from '../models/Booking.js'
import Room from '../models/Room.js'

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
  try {
    console.log('🔄 Received booking request:')
    console.log('User ID:', req.user?.id)
    console.log('Request body:', req.body)
    
    const { room, checkIn, checkOut, guests, specialRequests } = req.body

    // Validate dates
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const now = new Date()

    console.log('📅 Date validation:')
    console.log('Check-in:', checkInDate)
    console.log('Check-out:', checkOutDate)
    console.log('Now:', now)

    if (checkInDate < now) {
      console.log('❌ Check-in date is in the past')
      return res.status(400).json({ message: 'Check-in date cannot be in the past' })
    }

    if (checkOutDate <= checkInDate) {
      console.log('❌ Check-out date is not after check-in')
      return res.status(400).json({ message: 'Check-out date must be after check-in date' })
    }

    // Check if room exists and is available
    console.log('🏨 Looking for room with ID:', room)
    
    // Handle both mock room IDs and real MongoDB ObjectIds
    let roomExists = null
    
    // Check if it's a valid MongoDB ObjectId format (24 hex characters)
    const isValidObjectId = /^[0-9a-fA-F]{24}$/.test(room)
    
    if (isValidObjectId) {
      // It's a valid ObjectId, search normally
      roomExists = await Room.findById(room)
      console.log('Searching by ObjectId. Room found:', roomExists ? roomExists.name : 'Not found')
    } else {
      // It's likely a mock room ID (like "1", "2", etc.), try to find by roomNumber or name
      console.log('Invalid ObjectId format, searching by roomNumber or mock ID mapping...')
      
      // Map mock IDs to room numbers or try to find the first few rooms
      const mockIdMapping = {
        '1': 'DS001', // Deluxe Ocean View Suite
        '2': 'EX001', // Executive Business Room  
        '3': 'FR001', // Family Garden Villa
        '4': 'CC001', // Classic Comfort Room
        '5': 'PS001', // Presidential Suite
        '6': 'BT001', // Budget Traveler Room
        '7': 'DS001', // Fallback to first room
        '8': 'EX001'  // Fallback to second room
      }
      
      const roomNumber = mockIdMapping[room]
      if (roomNumber) {
        roomExists = await Room.findOne({ roomNumber: roomNumber })
        console.log(`Mapped mock ID "${room}" to roomNumber "${roomNumber}". Room found:`, roomExists ? roomExists.name : 'Not found')
      }
      
      // If still not found, try to get rooms by index
      if (!roomExists) {
        const allRooms = await Room.find({}).limit(10)
        const index = parseInt(room) - 1
        if (index >= 0 && index < allRooms.length) {
          roomExists = allRooms[index]
          console.log(`Using room at index ${index}:`, roomExists ? roomExists.name : 'Not found')
        }
      }
    }
    
    if (!roomExists) {
      console.log('❌ Room not found')
      return res.status(404).json({ message: 'Room not found' })
    }

    if (!roomExists.available) {
      console.log('❌ Room not available')
      return res.status(400).json({ message: 'Room is not available' })
    }

    if (guests > roomExists.capacity) {
      console.log('❌ Too many guests for room capacity')
      return res.status(400).json({ message: 'Number of guests exceeds room capacity' })
    }

    // Check for conflicting bookings
    console.log('🔍 Checking for booking conflicts...')
    const conflictingBooking = await Booking.findOne({
      room: roomExists._id, // Use the actual room ObjectId
      status: { $in: ['pending', 'confirmed'] },
      $or: [
        { checkIn: { $lt: checkOutDate }, checkOut: { $gt: checkInDate } }
      ]
    })

    if (conflictingBooking) {
      console.log('❌ Conflicting booking found:', conflictingBooking._id)
      return res.status(400).json({ message: 'Room is already booked for these dates' })
    }

    // Create booking
    console.log('✅ Creating booking...')
    
    // Calculate total amount
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
    const totalAmount = roomExists.price * nights
    
    console.log('💰 Booking calculation:')
    console.log('Room price per night:', roomExists.price)
    console.log('Number of nights:', nights)
    console.log('Total amount:', totalAmount)
    
    const booking = await Booking.create({
      user: req.user.id,
      room: roomExists._id, // Use the actual room ObjectId, not the mock ID
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      specialRequests,
      totalAmount: totalAmount
    })

    console.log('✅ Booking created with ID:', booking._id)

    const populatedBooking = await Booking.findById(booking._id)
      .populate('room', 'name description price')
      .populate('user', 'firstName lastName email')

    console.log('✅ Booking response ready:', populatedBooking._id)
    res.status(201).json(populatedBooking)
  } catch (error) {
    console.error('🚨 Booking creation error:', error)
    res.status(500).json({ message: 'Server error: ' + error.message })
  }
}

// @desc    Get user bookings
// @route   GET /api/bookings/user
// @access  Private
export const getUserBookings = async (req, res) => {
  try {
    console.log('📋 Fetching bookings for user:', req.user.id)
    const bookings = await Booking.find({ user: req.user.id })
      .populate('room', 'name description price image')
      .sort({ createdAt: -1 })

    console.log('📋 Found bookings:', bookings.length)
    res.json(bookings)
  } catch (error) {
    console.error('❌ Error fetching user bookings:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('room', 'name description price')
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 })

    res.json(bookings)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('room', 'name description price image')
      .populate('user', 'firstName lastName email')

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    // Check if user owns this booking or is admin
    if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this booking' })
    }

    res.json(booking)
  } catch (error) {
    console.error(error)
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Booking not found' })
    }
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    // Check if user owns this booking or is admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this booking' })
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('room', 'name description price')

    res.json(updatedBooking)
  } catch (error) {
    console.error(error)
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Booking not found' })
    }
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Cancel booking
// @route   DELETE /api/bookings/:id
// @access  Private
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' })
    }

    // Check if user owns this booking or is admin
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' })
    }

    // Update booking status to cancelled instead of deleting
    booking.status = 'cancelled'
    await booking.save()

    res.json({ message: 'Booking cancelled successfully' })
  } catch (error) {
    console.error(error)
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Booking not found' })
    }
    res.status(500).json({ message: 'Server error' })
  }
}
