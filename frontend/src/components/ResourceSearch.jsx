import { useState } from 'react';
import axios from 'axios';

export default function ResourceSearch() {
  const [services] = useState(['Legal Aid', 'Mental Health', 'Shelter']);
  const [results, setResults] = useState([]);

  const handleSearch = async (service) => {
    try {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { data } = await axios.get('/api/v1/ngos', {
          params: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            service
          }
        });
        setResults(data.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search-container">
      <div className="service-buttons">
        {services.map(service => (
          <button key={service} onClick={() => handleSearch(service)}>
            {service}
          </button>
        ))}
      </div>
      
      <div className="results">
        {results.map(ngo => (
          <div key={ngo._id} className="ngo-card">
            <h3>{ngo.name}</h3>
            <p>{ngo.phone}</p>
            <p>{ngo.services.join(', ')}</p>
            <p>{ngo.location.formattedAddress}</p>
          </div>
        ))}
      </div>
    </div>
  );
}