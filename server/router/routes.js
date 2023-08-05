const express = require("express");
const router = express.Router();
const Category = require("../schemas/category.js");
const Cloze = require("../schemas/cloze.js");
const Comprehension = require("../schemas/comprehension.js");
const Form = require("../schemas/form.js");
const Response=require('../schemas/response.js')
const app = express();
const saveCategoryQuestions = async (categoryQuestions) => {
  const ids = [];
  if(!categoryQuestions.items)return;
  for (const ques of categoryQuestions.items) {
    
    const newQues = Category({
      category: ques.category,
      item: ques.title,
    });
    const savedQues = await newQues.save();
    ids.push(savedQues._id);
  }
  return ids;
};

// Function to save Cloze questions
const saveClozeQuestions = async (clozeQuestions) => {
  const ids = [];
  const newQues = Cloze({
    sentence: clozeQuestions.sentence,
    words: clozeQuestions.options,
  });
  const savedQues = await newQues.save();
  ids.push(savedQues._id);
  return ids;
};

// Function to save Comprehension questions
const saveComprehensionQuestions = async (comprehensionQuestions, passage) => {
  const ids = [];
  for (const ques of comprehensionQuestions) {
    const newQues = Comprehension({
      passage: passage,
      question: ques.question,
      options: ques.options,
    });
    const savedQues = await newQues.save();
    ids.push(savedQues._id);
  }
  return ids;
};

// Main route to handle form submission and save data to MongoDB
router.post("/saveForm", async (req, res) => {
  try {
    const { formName,imgUrl,comprehension, cloze, category } = req.body;
    console.log(category)
    const categoryIds = await saveCategoryQuestions(category);
    const clozeIds = await saveClozeQuestions(cloze);
    let comprehensionIds=null;
    if(comprehension.updatedQuestions && comprehension.passage){
    comprehensionIds = await saveComprehensionQuestions(
      comprehension.updatedQuestions,
      comprehension.passage
    );}
    // console.log("hi")

    const newForm = Form({
      formName:formName,
      imgUrl:imgUrl,
      Category: categoryIds,
      Cloze: clozeIds,
      Comprehension: comprehensionIds,
    });
    const savedFrom = await newForm.save();
    return res
      .status(201)
      .json({ message: "Form data saved successfully", savedFrom: savedFrom });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.post('/deleteForm',async(req,res)=>{
  try{
    const data=await Form.deleteOne({_id:req.body.id})
    res.status(200).json({mess:data})
  }catch(err){
    res.status(500).json(err)
  }
})
//fetchform_to_render.jsx

router.get('/getAllForms', async (req, res) => {
  try {
    const formData = await Form.find();
    res.json(formData);
  } catch (err) {
    console.error('Error fetching form data:', err);
    res.status(500).json({ error: 'Error fetching form data' });
  }
});

router.post('/getForm', async (req, res) => {
  try {
    const formData = await Form.findById(req.body.id).populate('Category').populate('Cloze').populate('Comprehension');
    res.json(formData);
  } catch (err) {
    console.error('Error fetching form data:', err);
    res.status(500).json({ error: 'Error fetching form data' });
  }
});

router.post('/submitForm',async(req,res)=>{
  try{
    const{category,cloze,comprehension}=req.body;
    console.log(category)
    console.log(cloze)
    console.log(comprehension)
    const newResponse=Response({
      category:category,
      cloze:cloze,
      comprehension:comprehension
    })
    const savedResponse=await newResponse.save();
    return res.status(200).json({mess:'forme submitted successfully',savedResponse})
  }
  catch(err){res.status(500).json({"err":err})}
})


module.exports = router;
