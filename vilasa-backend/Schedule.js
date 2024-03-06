const cron = require('node-cron');
const Chat = require('./model/ChatModel');

// Schedule a task to run every day to delete chat messages marked for deletion
cron.schedule('0 0 * * *', async () => {
  try {
    const currentDate = new Date();
    const messagesToDelete = await Chat.find({ markedForDeletion: true, deletionDate: { $lte: currentDate } });
    await Chat.deleteMany({ _id: { $in: messagesToDelete.map(message => message._id) } });
    console.log('Deleted expired chat messages:', messagesToDelete.length);
  } catch (error) {
    console.error('Error deleting chat messages:', error);
  }
});
