import express from 'express'
import { body, validationResult } from 'express-validator'
import { protect } from '../middleware/auth.js'
import { 
  createBooking, 
  getUserBookings, 
  getAllBookings, 
  getBooking, 
  updateBooking, 
  cancelBooking 
} from '../controllers/bookingController.js'

const router = express.Router()

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private
router.post('/', protect, [
  body('room').notEmpty().withMessage('Room is required'),
  body('checkIn').isISO8601().withMessage('Valid check-in date is required'),
  body('checkOut').isISO8601().withMessage('Valid check-out date is required'),
  body('guests').isInt({ min: 1 }).withMessage('Number of guests must be at least 1')
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg })
  }
  createBooking(req, res)
})

// @desc    Get user bookings
// @route   GET /api/bookings/user
// @access  Private
router.get('/user', protect, getUserBookings)

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
router.get('/', protect, getAllBookings)

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
router.get('/:id', protect, getBooking)

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
router.put('/:id', protect, updateBooking)

// @desc    Cancel booking
// @route   DELETE /api/bookings/:id
// @access  Private
router.delete('/:id', protect, cancelBooking)

export default router
