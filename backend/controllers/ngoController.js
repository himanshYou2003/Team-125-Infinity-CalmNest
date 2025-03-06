import asyncHandler from 'express-async-handler';
import Ngo from '../models/Ngo.js';

// @desc    Get nearby NGOs
// @route   GET /api/v1/ngos
export const getNgos = asyncHandler(async (req, res) => {
  const { address } = req.query;
  
  let query = {};
  if(address) {
    query = {
      $or: [
        { address: { $regex: address, $options: 'i' } },
        { 'location.formattedAddress': { $regex: address, $options: 'i' } }
      ]
    }
  }

  const ngos = await Ngo.find(query).sort('-createdAt');
  res.json({ success: true, count: ngos.length, data: ngos });
});


export const createNgo = asyncHandler(async (req, res) => {
  const ngo = await Ngo.create(req.body);
  res.status(201).json({ success: true, data: ngo });
});
