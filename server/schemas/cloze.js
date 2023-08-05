const mongoose = require("mongoose");

const ClozeSchema = new mongoose.Schema({
    sentence: {
        type: String,
        required: false,
      },
    words: { 
        type: Array, 
        required: false 
      }
    },
);

const Cloze = mongoose.model("Cloze", ClozeSchema);
module.exports = Cloze;
