const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema({
  
      category: {
        type: Object,
        required: false,
      },
      cloze:{ 
        type: String, 
        required: false 
      },
      comprehension:{
        type: Object,
        required: false,
      }
    },
  );

const Response = mongoose.model("Response", ResponseSchema);
module.exports = Response;
