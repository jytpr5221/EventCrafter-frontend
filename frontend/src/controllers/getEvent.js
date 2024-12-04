import axiosInstance from "../axios.config";

export default async function getEvent(eventid) {
    try {
      const response = await axiosInstance.get(`/events/${eventid}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching event:", error);
      return null;
    }
  }
