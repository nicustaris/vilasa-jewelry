import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getEnquiryChat,
  sendChatMessage,
} from "../../../store/enquiry/enquirySlice";
import { getUser } from "../../../services/userServices";
import {
  getEnquiries,
  getEnquiryById,
} from "../../../store/enquiries/enquiriesSlice";

const EnquiryDetails = () => {
  const { id: enquiryId } = useParams();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(getEnquiryChat(enquiryId));
    dispatch(getEnquiries());
  }, [enquiryId]);

  const { enquiryChat, isLoading } = useSelector((state) => state.enquiry);
  const enquiries = useSelector((state) => getEnquiryById(state, enquiryId));

  // Sender id
  // Needs further works and global state to be implemented
  // For temporar use
  const { id: userId } = getUser();

  const receiver =
    enquiryChat?.length > 0 ? enquiryChat[0].receiver : enquiries?.user;

  const handleChatSubmit = (e) => {
    e.preventDefault();

    dispatch(
      sendChatMessage({
        sender: userId,
        receiver,
        enquiry: enquiryId,
        senderRole: "admin",
        message,
      })
    );
    setMessage("");
  };

  return (
    <div className="flex flex-col w-full h-screen p-5">
      <h2>Subject{enquiries?.subject}</h2>
      <span>MSG {enquiries?.message}</span>
      {enquiryChat?.map((enquiry) => (
        <div
          key={enquiry._id}
          className={`flex ${
            enquiry.senderRole === "admin" ? "justify-end" : "justify-start"
          }`}
        >
          ROLE: {enquiry.senderRole} {enquiry.message}
        </div>
      ))}
      <form className="mt-10" onSubmit={handleChatSubmit}>
        <textarea
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="border border-gray-300 rounded-md p-2 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default EnquiryDetails;
