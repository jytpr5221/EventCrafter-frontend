import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios.config';
import Orgs from './Orgs';
import { useNavigate } from 'react-router-dom';

function Organizations() {
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const response = await axiosInstance.get('/org');
        setOrgs(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrgs();
  }, []);

  if (loading) {
    return (
      <div className='fs-3 fw-medium text-warning text-center mt-5'>Loading...</div>
    );
  }

  return (
    <div>
      {orgs.length > 0 ? (
        orgs.map((org) => (
          <Orgs key={org._id} org={org} />
        ))
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <div className="text-center text-white">
            <p className="fs-3 fw-semibold text-warning">
              No organizations to show
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Organizations;
