import mongoose from 'mongoose';
import geocoder from '../config/geocoder.js';

const NgoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  services: [String],
  phone: String,
  website: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.model('Ngo', NgoSchema);