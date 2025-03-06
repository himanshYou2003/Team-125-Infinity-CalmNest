import { useEffect, useState } from 'react'
import axios from 'axios'

export default function NGOSearch() {
  const [ngos, setNgos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchAddress, setSearchAddress] = useState('')

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const params = searchAddress ? { address: searchAddress } : {}
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/ngos`, { params })
        setNgos(data.data)
        setError('')
      } catch (error) {
        setError('Failed to fetch NGOs')
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchNgos()
  }, [searchAddress])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-20 m-30">
        <h2 className="text-4xl font-bold mb-6">Search NGOs by Location</h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
  <input
    type="text"
    placeholder="Enter city, area or full address"
    className="input-field w-full"
    value={searchAddress}
    onChange={(e) => setSearchAddress(e.target.value)}
  />
</div>
      </div>

      {loading ? (
        <div className="text-center">Loading NGOs...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : ngos.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ngos.map(ngo => (
            <div key={ngo._id} className="card hover:shadow-lg transition-shadow p-6">
              <h3 className="text-xl font-semibold mb-2">{ngo.name}</h3>
              <p className="text-gray-600 mb-4">
                📍 {ngo.location?.formattedAddress || ngo.address}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {ngo.services.map(service => (
                  <span 
                    key={service}
                    className="bg-blue-100 text-blue-800 text-sm px-2.5 py-0.5 rounded"
                  >
                    {service}
                  </span>
                ))}
              </div>
              <div className="space-y-1">
                {ngo.phone && <p className="text-gray-600">📞 {ngo.phone}</p>}
                {ngo.website && (
                  <a 
                    href={ngo.website}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🌐 Visit Website
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No NGOs found in this location</p>
      )}
    </div>
  )
}