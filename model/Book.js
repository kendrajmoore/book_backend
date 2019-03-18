const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//user model
const BookSchema = new Schema({
  name: String,
  author: String,
  category: String,
  photos: String,
  recording: String,
  pageOne: String, 
  pageTwo: String, 
  pageThree: String, 
  pageFour: String, 
  pageFive: String, 
  pageSix: String, 
  pageSeven: String, 
  pageEight: String, 
  pageNine: String, 
  pageTen: String, 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});


module.exports = mongoose.model("Book", BookSchema);