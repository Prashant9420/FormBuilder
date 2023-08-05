const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  
      category: {
        type: String,
        required: false,
      },
      item:{ 
        type: String, 
        required: false 
      }
    },
  );

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
