const mongoose = require('mongoose');

/**
 * Enquiry Schema
 * Represents enquiries made by users in the e-commerce system.
 * Author: Kuntal Roy
 */
const enquirySchema = new mongoose.Schema(
  {
    // Name of the user making the enquiry
    name: {
      type: String,
      required: true,
      // Explanation: Name of the user making the enquiry. Required field.
    },
    // Email of the user making the enquiry
    email: {
      type: String,
      required: true,
      validate: {
        validator: (value) => {
          // Validate email format
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(String(value).toLowerCase());
        },
        message: 'Please enter a valid email address',
        // Explanation: Email address of the user making the enquiry. Required field. Validates format.
      },
    },
    // Mobile number of the user making the enquiry
    mobile: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
      validate: {
        validator: (value) => {
          // Validate mobile number format
          const re = /^[6-9]\d{9}$/;
          return re.test(String(value));
        },
        message: 'Please enter a valid mobile number',
        // Explanation: Mobile number of the user making the enquiry. Required field. Validates format.
      },
    },
    // Comment or message of the enquiry
    comment: {
      type: String,
      required: true,
      // Explanation: Comment or message of the enquiry. Required field.
    },
    // Status of the enquiry
    status: {
      type: String,
      enum: ['submitted', 'in-progress', 'resolved'],
      default: 'submitted',
      // Explanation: Status of the enquiry. Possible values: submitted, in-progress, resolved. Default is submitted.
    },
  },
  {
    timestamps: true,
    // Explanation: Automatically adds createdAt and updatedAt fields.
  }
);

// Export the model
module.exports = mongoose.model('Enquiry', enquirySchema);
