import apiClient from "../utils/api-client";

const getEnquiries = async () => {
  const enquiries = await apiClient.get("/vilasa-v1/venquiry/f1/enquiries");
  return enquiries.data;
};

const enquirieService = {
  getEnquiries,
};

export default enquirieService;
