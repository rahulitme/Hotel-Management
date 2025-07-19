import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  guests: {
    type: Number,
    required: true,
    min: 1
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'confirmed'
  },
  specialRequests: {
    type: String,
    trim: true,
    default: ''
  }
}, {
  timestamps: true
})

// Calculate total amount before saving
bookingSchema.pre('save', async function(next) {
  if (this.isModified('checkIn') || this.isModified('checkOut') || this.isModified('room')) {
    const Room = mongoose.model('Room')
    const room = await Room.findById(this.room)
    
    if (room) {
      const nights = Math.ceil((this.checkOut - this.checkIn) / (1000 * 60 * 60 * 24))
      this.totalAmount = room.price * nights
    }
  }
  next()
})

export default mongoose.model('Booking', bookingSchema)
