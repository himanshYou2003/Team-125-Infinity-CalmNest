//pages/Report/CreateReport.jsx
import { useState } from 'react'
import axios from 'axios'

export default function CreateReport() {
  const [formData, setFormData] = useState({
    incidentType: 'harassment',
    description: '',
    lat: '',
    lng: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/reports`,
        formData
      )
      alert(`Report created successfully! ID: ${data.data.reportId}`)
      setFormData({
        incidentType: 'harassment',
        description: '',
        lat: '',
        lng: ''
      })
    } catch (error) {
      alert(error.response.data.error)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6 text-center">File Anonymous Report</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label>Incident Type</label>
            <select
              className="input-field"
              value={formData.incidentType}
              onChange={(e) => setFormData({ ...formData, incidentType: e.target.value })}
            >
              <option value="harassment">Harassment</option>
              <option value="assault">Assault</option>
              <option value="theft">Theft</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label>Location Coordinates</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                step="any"
                placeholder="Latitude"
                className="input-field"
                value={formData.lat}
                onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                required
              />
              <input
                type="number"
                step="any"
                placeholder="Longitude"
                className="input-field"
                value={formData.lng}
                onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label>Description (optional)</label>
            <textarea
              className="input-field h-32"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              maxLength="500"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  )
}