import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  incidentType: {
    type: String,
    required: true,
    enum: ['harassment', 'assault', 'theft', 'other']
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
    }
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  reportId: {
    type: String,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'investigating', 'resolved'],
    default: 'pending'
  }
}, {
  timestamps: true
});

export default mongoose.model('Report', ReportSchema);