import asyncHandler from 'express-async-handler';
import Report from '../models/Report.js';
import generateReportId from '../utils/generateReportId.js';

// @desc    Create anonymous report
// @route   POST /api/v1/reports
export const createReport = asyncHandler(async (req, res) => {
  const { incidentType, description, lat, lng } = req.body;
  
  const report = await Report.create({
    incidentType,
    description,
    location: {
      type: 'Point',
      coordinates: [parseFloat(lng), parseFloat(lat)]
    },
    reportId: generateReportId()
  });

  req.io.emit('new-report', report);
  
  res.status(201).json({
    success: true,
    data: { reportId: report.reportId }
  });
});

// @desc    Get all reports (Admin only)
// @route   GET /api/v1/reports
export const getReports = asyncHandler(async (req, res) => {
  const { lat, lng, radius = 5000 } = req.query;
  
  let query = {};
  
  if(lat && lng) {
    query['location'] = {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(lng), parseFloat(lat)]
        },
        $maxDistance: parseInt(radius)
      }
    };
  }

  const reports = await Report.find(query);
  res.json({ success: true, count: reports.length, data: reports });
});