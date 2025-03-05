import { useState } from 'react';
import axios from 'axios';

export default function ReportPage() {
  const [formData, setFormData] = useState({
    incidentType: '',
    description: ''
  });
  const [reportId, setReportId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { data } = await axios.post('/api/v1/reports', {
          ...formData,
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setReportId(data.reportId);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="report-form">
      {reportId ? (
        <div className="success-message">
          Report submitted! ID: {reportId}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <select 
            value={formData.incidentType}
            onChange={(e) => setFormData({...formData, incidentType: e.target.value})}
          >
            <option value="">Select Incident Type</option>
            <option value="harassment">Harassment</option>
            <option value="assault">Assault</option>
          </select>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
          <button type="submit">Submit Anonymously</button>
        </form>
      )}
    </div>
  );
}