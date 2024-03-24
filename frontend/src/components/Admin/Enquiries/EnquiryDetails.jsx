import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getEnquiryChat,
  sendChatMessage,
} from "../../../store/enquiry/enquirySlice";
import { getUser } from "../../../services/userServices";

const EnquiryDetails = () => {
  const { id: enquiryId } = useParams();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const { enquiry, isLoading } = useSelector((state) => state.enquiry);
  useSelector((state) => state.enquiries);

  // User id
  // Needs further works and global state to be implemented
  // For temporar use
  const { id: userId } = getUser();

  useEffect(() => {
    dispatch(getEnquiryChat(enquiryId));
  }, []);

  const handleChatSubmit = (e) => {
    e.preventDefault();

    const receiver = enquiry[0].receiver;
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
      {enquiry?.map((enquiry) => (
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
