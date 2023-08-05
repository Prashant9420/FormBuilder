const mongoose = require("mongoose");

const ComprehensionSchema = new mongoose.Schema({
  passage: {
    type: String,
    required: false,
  },
  question: {
    type: String,
    required: false,
  },
  options: 
    {
      type: Array,
      required: false,
    },
});

const Comprehension = mongoose.model("Comprehension", ComprehensionSchema);
module.exports = Comprehension;
