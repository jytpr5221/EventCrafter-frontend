import React from 'react'
import { useNavigate } from 'react-router-dom';

function Orgs({ org }) {
  const navigate=useNavigate()
  return (
    <div 
      className="card m-auto mt-5 shadow-sm w-75 card-custom text-white"
      style={{
        background: "linear-gradient(135deg, #2c3e50, #4c5c68)",
        borderRadius: "15px",
        padding: "20px",
        cursor:'pointer'
      }}
      onClick={()=>{
        navigate(`/organizations/:${org._id}`)
      }}
    >
      <div className="text-center">
        <h3 
          className="fw-bold" 
          style={{
            color: '#f39c12'  
          }}
        >
          {org.name.toUpperCase()}
        </h3>
      </div>
      <div className=' '>
        <div>
        <div>
        <span className='text-info fw-semibold'>Organization ID : </span> {org._id}
      </div>
      
      <div>
        <span className='text-info fw-semibold'>No. of Events  :</span> {org.created ? org.created.length : 0}
      </div>
        </div>
        <div>
          <div>
          <span className='text-info fw-semibold'>Contact no : </span> {org.contact}
          </div>
          <div>
          <span className='text-info fw-semibold'>Email : </span> {org.email}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orgs;

