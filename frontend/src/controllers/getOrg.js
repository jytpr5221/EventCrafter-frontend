import axiosInstance from "../axios.config";

export default async function getOrganization(orgid) {
    try {
        const response = await axiosInstance.get(`/org/${orgid}`);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error("Failed to fetch organization:", error);
        return null;
    }
}
