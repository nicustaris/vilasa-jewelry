import apiClient from "../utils/api-client";

const getEnquiries = async () => {
  const enquiries = await apiClient.get("/vilasa-v1/venquiry/f1/enquiries");
  return enquiries.data;
};

const getEnquiryChat = async (enquiryId) => {
  const enquiry = await apiClient.get(
    `/vilasa-v1/chat/v.0.0.1/enquiries/${enquiryId}/chats`
  );

  return enquiry.data;
};

const sendChatMessage = async (data) => {
  const chatmessage = await apiClient.post(
    "/vilasa-v1/chat/v.0.0.1/chats",
    data
  );
  return chatmessage.data;
};

const enquirieService = {
  getEnquiries,
  getEnquiryChat,
  sendChatMessage,
};

export default enquirieService;
