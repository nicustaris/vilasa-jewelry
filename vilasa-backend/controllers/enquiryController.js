const Enquiry = require("../model/Enquiry");

// Create a new enquiry
const createEnquiry = async (req, res, next) => {
  const { user, subject, message } = req.body;
  console.log("user", user);

  try {
    // Validate the request
    if (!user || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "User, subject, and message are required fields.",
      });
    }

    // Create enquiry object
    const newEnquiry = await Enquiry.create({
      user,
      subject,
      message,
      // You can include other fields here as needed, such as admin, status, etc.
    });

    // Respond with success message and the created enquiry object
    res.status(201).json({ success: true, data: newEnquiry });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Get all enquiries
const getAllEnquiries = async (req, res, next) => {
  try {
    // Retrieve all enquiries from the database
    const enquiries = await Enquiry.find();

    // Respond with the retrieved enquiries
    res
      .status(200)
      .json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// Get enquiries for the authenticated user
const getOwnEnquiries = async (req, res, next) => {
  try {
    // Retrieve enquiries associated with the authenticated user
    const enquiries = await Enquiry.find({ user: req.user._id });

    // Respond with the retrieved enquiries
    res
      .status(200)
      .json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
// Delete an enquiry by ID
const deleteEnquiry = async (req, res, next) => {
  const { enquiryId } = req.params;

  try {
    // Find the enquiry by ID and delete it
    const deletedEnquiry = await Enquiry.findByIdAndDelete(enquiryId);

    if (!deletedEnquiry) {
      return res
        .status(404)
        .json({ success: false, message: "Enquiry not found." });
    }

    // Delete associated chat messages
    await Chat.deleteMany({ enquiry: enquiryId });

    // Respond with success message and the deleted enquiry
    res.status(200).json({
      success: true,
      message: "Enquiry and associated chat messages deleted successfully.",
      data: deletedEnquiry,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

module.exports = {
  createEnquiry,
  getAllEnquiries,
  getOwnEnquiries,
  deleteEnquiry,
};
