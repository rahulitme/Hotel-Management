import express from 'express'
import { protect, admin } from '../middleware/auth.js'
import { 
  getRooms, 
  getRoom, 
  createRoom, 
  updateRoom, 
  deleteRoom 
} from '../controllers/roomController.js'

const router = express.Router()

// @desc    Get all rooms
// @route   GET /api/rooms
// @access  Public
router.get('/', getRooms)

// @desc    Get single room
// @route   GET /api/rooms/:id
// @access  Public
router.get('/:id', getRoom)

// @desc    Create room
// @route   POST /api/rooms
// @access  Private/Admin
router.post('/', protect, admin, createRoom)

// @desc    Update room
// @route   PUT /api/rooms/:id
// @access  Private/Admin
router.put('/:id', protect, admin, updateRoom)

// @desc    Delete room
// @route   DELETE /api/rooms/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteRoom)

export default router
