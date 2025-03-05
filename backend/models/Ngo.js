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
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere'
    },
    formattedAddress: String
  },
  services: [String],
  phone: String,
  website: String,
  verified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Geocoding hook - create location from address
NgoSchema.pre('save', async function(next) {
  try {
    const geoData = await geocoder.geocode(this.address);
    
    if (geoData.length === 0) {
      throw new Error('Could not geocode address');
    }

    this.location = {
      type: 'Point',
      coordinates: [geoData[0].longitude, geoData[0].latitude],
      formattedAddress: geoData[0].formattedAddress
    };

    //i won't save address in DB since we have formattedAddress
    this.address = undefined;
    
    next();
  } catch (err) {
    next(err);
  }
});

export default mongoose.model('Ngo', NgoSchema);