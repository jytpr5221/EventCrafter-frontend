import axiosInstance from "../axios.config";

const createNewEvent = async({title,type,availableTickets,eventDate,ticketsClosedOn})=>{
    

    try {
        const response=await axiosInstance.post(`/events/create-event`,{
            ticketsClosedOn,
            eventDate,
            availableTickets,
            title,
            type
        })
        //console.log(response)
        alert(response.data._message )
        return response.data
    } catch (error) {
        alert("Couldn't create new event")
        console.error(error)
    }

}

export default createNewEvent