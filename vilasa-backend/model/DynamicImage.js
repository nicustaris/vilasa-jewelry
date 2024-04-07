const mongoose = require("mongoose");

const dynamicImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  group: {
    type: String,
    required: true,
  },
  url: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Url",
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("DynamicImage", dynamicImageSchema);
