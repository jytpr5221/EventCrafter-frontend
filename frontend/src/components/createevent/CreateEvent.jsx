import React, { useState } from "react";
import createNewEvent from "../../controllers/createEvent";

function CreateEvent() {
    const [title,setTitle]=useState('')
    const [type,setType] = useState('')
    const [eventDate,setEventDate]=useState('')
    const [ticketsClosedOn,setTicketsClosedOn]=useState('')
    const [availableTickets,setAvailableTickets]=useState(0)
    
    const handleNewEvent=async (e)=>{
        e.preventDefault()
        if(!title || !type || !eventDate || !ticketsClosedOn || !availableTickets){

            alert('All fields are required!!')
            return
        } 
        if(availableTickets <=0 ){
          alert("Add tickets to proceed")
          setAvailableTickets(0)
          return
        }
        try {
            const response = await createNewEvent({title,type,eventDate,ticketsClosedOn,availableTickets})
            setAvailableTickets(0)
            setTitle('')
            setType('')
            setEventDate('')
            setTicketsClosedOn('')
            const org=JSON.parse(localStorage.getItem('user'))
            org.created.push(response.event._id)
            localStorage.setItem('user',JSON.stringify(org))
            console.log('event successfully created')
        } catch (error) {
            console.log('some error occurred')
        }
    }
    return (
      <div className="container w-50 m-auto mt-5">
      <form>
        <div className="mb-3">
          <label htmlFor="category" className="form-label text-white">Category</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-control"
            id="category"
            style={{
              backgroundColor: '#2c3e50',
              color: '#fff',
              border: '1px solid #666',
              borderRadius: '5px',
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label text-white">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            style={{
              backgroundColor: '#2c3e50',
              color: '#fff',
              border: '1px solid #666',
              borderRadius: '5px',
            }}
          />
        </div>
    
        <div className="mb-3">
          <label htmlFor="availableTickets" className="form-label text-white">Available Tickets</label>
          <input
            type="number"
            value={availableTickets}
            onChange={(e) => setAvailableTickets(e.target.value)}
            className="form-control"
            id="availableTickets"
            style={{
              backgroundColor: '#2c3e50',
              color: '#fff',
              border: '1px solid #666',
              borderRadius: '5px',
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="eventDate" className="form-label text-white">Event Date</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="form-control"
            id="eventDate"
            style={{
              backgroundColor: '#2c3e50',
              color: '#fff',
              border: '1px solid #666',
              borderRadius: '5px',
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ticketsClosedOn" className="form-label text-white">Registration Close-On</label>
          <input
            type="date"
            value={ticketsClosedOn}
            onChange={(e) => setTicketsClosedOn(e.target.value)}
            className="form-control"
            id="ticketsClosedOn"
            style={{
              backgroundColor: '#2c3e50',
              color: '#fff',
              border: '1px solid #666',
              borderRadius: '5px',
            }}
          />
        </div>
    
        <button
          type="submit"
          className="btn w-100"
          style={{
            background: 'linear-gradient(135deg, #ff5e57, #ff8566)',
            borderRadius: '25px',
            padding: '10px',
            color: '#fff',
            border: 'none',
          }}
          onClick={handleNewEvent}
        >
          Submit
        </button>
      </form>
    </div>
    
  );
}

export default CreateEvent;
