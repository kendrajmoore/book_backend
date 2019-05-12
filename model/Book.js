const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//user model - only require name for ease of testing 
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
  imageOne: { type: String, default: '/public/moon.png' },
  imageTwo: { type: String, default: '/public/moon.png' }, 
  imageThree:{ type: String, default: '/public/moon.png' }, 
  imageFour: { type: String, default: '/public/moon.png' }, 
  imageFive: { type: String, default: '/public/moon.png' }, 
  imageMoon: { type: String, default: '/public/moon.png' },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});


module.exports = mongoose.model("Book", BookSchema);