import Room from '../models/Room.js'

// @desc    Get all rooms
// @route   GET /api/rooms
// @access  Public
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({})
    res.json(rooms)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Get single room
// @route   GET /api/rooms/:id
// @access  Public
export const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
    
    if (!room) {
      return res.status(404).json({ message: 'Room not found' })
    }

    res.json(room)
  } catch (error) {
    console.error(error)
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Room not found' })
    }
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Create room
// @route   POST /api/rooms
// @access  Private/Admin
export const createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body)
    res.status(201).json(room)
  } catch (error) {
    console.error(error)
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors).map(val => val.message).join(', ')
      return res.status(400).json({ message })
    }
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Update room
// @route   PUT /api/rooms/:id
// @access  Private/Admin
export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })

    if (!room) {
      return res.status(404).json({ message: 'Room not found' })
    }

    res.json(room)
  } catch (error) {
    console.error(error)
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Room not found' })
    }
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Delete room
// @route   DELETE /api/rooms/:id
// @access  Private/Admin
export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id)

    if (!room) {
      return res.status(404).json({ message: 'Room not found' })
    }

    res.json({ message: 'Room deleted successfully' })
  } catch (error) {
    console.error(error)
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Room not found' })
    }
    res.status(500).json({ message: 'Server error' })
  }
}
