import { useEffect, useState } from 'react';
import axios from 'axios';

export default function NgoManagement() {
  const [ngos, setNgos] = useState([]);

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const { data } = await axios.get('/api/v1/ngos/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`
          }
        });
        setNgos(data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNgos();
  }, []);

  const verifyNgo = async (id) => {
    try {
      await axios.put(`/api/v1/ngos/${id}/verify`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      setNgos(ngos.map(ngo => 
        ngo._id === id ? { ...ngo, verified: true } : ngo
      ));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="ngo-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ngos.map(ngo => (
            <tr key={ngo._id}>
              <td>{ngo.name}</td>
              <td>{ngo.verified ? 'Verified' : 'Pending'}</td>
              <td>
                {!ngo.verified && (
                  <button onClick={() => verifyNgo(ngo._id)}>
                    Verify NGO
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}