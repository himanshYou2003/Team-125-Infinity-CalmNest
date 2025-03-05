import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if(req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if(!token) {
    res.status(401);
    throw new Error('Not authorized');
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401);
    throw new Error('Not authorized');
  }
});

export const authorize = (...roles) => (req, res, next) => {
  if(!roles.includes(req.user.role)) {
    res.status(403);
    throw new Error(`User role ${req.user.role} not authorized`);
  }
  next();
};