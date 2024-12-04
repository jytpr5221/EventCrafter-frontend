import axiosInstance from '../axios.config.js';

const bookTicket = async (ticketId) => {
  //console.log("Ticket ID:", ticketId);
  try {
    const response = await axiosInstance.post(`/events/book-ticket/${ticketId}`);
    alert('Successfully registered!');
    //console.log(response);

    const user = JSON.parse(localStorage.getItem('user')) || null;
    if (user) {
       let updatedUser={...user}
       if(!updatedUser._doc.registeredIn) {
        updatedUser._doc.registeredIn=[]
       }
       updatedUser._doc.registeredIn.push(ticketId)
       localStorage.setItem('user',JSON.stringify(updatedUser))
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      alert(error.response.data.message);
    } else {
      alert('Server failed!');
    }
    console.error('Error registering for event:', error);
  }
};

export default bookTicket;
