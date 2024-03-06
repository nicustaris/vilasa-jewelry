const Chat = require("../model/ChatModel");
const asyncHandler =  require('../middleware/asyncErrorHandler');


// Create a new chat message
const createChatMessage = asyncHandler(async (req, res) => {
  const { sender, receiver, enquiry, message, senderRole } = req.body;
  try {
    const newChat = await Chat.create({ sender, receiver, enquiry, message, senderRole });
    res.status(201).json(newChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Get all chat messages for a specific enquiry
const getEnquiryChatMessages = asyncHandler(async (req, res) => {
  const { enquiryId } = req.params;
  try {
    const chatMessages = await Chat.find({ enquiry: enquiryId }).sort({ createdAt: 1 });
    res.json(chatMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});



// Mark chat message for deletion
const markChatForDeletion = asyncHandler(async (req, res) => {
    const { chatId } = req.params;
    try {
      // Find the chat message by ID and update its fields
      const chat = await Chat.findByIdAndUpdate(chatId, { markedForDeletion: true, deletionDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) }, { new: true });
      if (!chat) {
        return res.status(404).json({ message: 'Chat message not found.' });
      }
      res.status(200).json({ message: 'Chat message marked for deletion.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });



  module.exports = {
    createChatMessage,
    getEnquiryChatMessages,
    markChatForDeletion
  };
  
  