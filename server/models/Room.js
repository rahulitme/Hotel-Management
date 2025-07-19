import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  amenities: [{
    type: String,
    trim: true
  }],
  image: {
    type: String,
    default: ''
  },
  available: {
    type: Boolean,
    default: true
  },
  roomNumber: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
})

export default mongoose.model('Room', roomSchema)
