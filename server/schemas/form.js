const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
  formName:{
    type:String,
    required:true
  },
  imgUrl:{
    type:String,
    required:false
  },
  Category: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  }],
  Cloze: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cloze",
  }],
  Comprehension: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comprehension",
  }],
});

const Form = mongoose.model("Form", FormSchema);
module.exports = Form;
