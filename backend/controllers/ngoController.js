import asyncHandler from 'express-async-handler';
import Ngo from '../models/Ngo.js';

// @desc    Get nearby NGOs
// @route   GET /api/v1/ngos
export const getNgos = asyncHandler(async (req, res) => {
  const { lat, lng, service, radius = 50000 } = req.query;
  
  const query = { verified: true };
  if(service) query.services = service;

  const ngos = await Ngo.find(query).where('location').near({
    center: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
    maxDistance: parseInt(radius),
    spherical: true
  });

  res.json({ success: true, count: ngos.length, data: ngos });
});

// @desc    Create new NGO (Admin only)
// @route   POST /api/v1/ngos
export const createNgo = asyncHandler(async (req, res) => {
  const ngo = await Ngo.create(req.body);
  res.status(201).json({ success: true, data: ngo });
});

// @desc    Verify NGO (Admin only)
// @route   PUT /api/v1/ngos/:id/verify
export const verifyNgo = asyncHandler(async (req, res) => {
  const ngo = await Ngo.findByIdAndUpdate(
    req.params.id,
    { verified: true },
    { new: true }
  );
  res.json({ success: true, data: ngo });
});

// @desc    Update NGO details (Admin only)
// @route   PUT /api/v1/ngos/:id
export const updateNgo = asyncHandler(async (req, res) => {
  const ngo = await Ngo.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  res.json({ success: true, data: ngo });
});

// @desc    Delete NGO (Admin only)
// @route   DELETE /api/v1/ngos/:id
export const deleteNgo = asyncHandler(async (req, res) => {
  await Ngo.findByIdAndDelete(req.params.id);
  res.json({ success: true, data: {} });
});