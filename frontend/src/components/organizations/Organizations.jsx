import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axios.config';
import Orgs from './Orgs';
import { useNavigate } from 'react-router-dom';

function Organizations() {
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const response = await axiosInstance.get('/org');
        //console.log(response);
        setOrgs(response.data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrgs();
  }, []);  

  return (
    <div>
       {(orgs.length>0) ? (
        orgs.map((org) => (
          <Orgs org={org}/>
        ))
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center"
        >
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
