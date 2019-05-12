const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//user model - this does not scale but i got finals
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
  pageEleven: String, 
  pageTwelve: String, 
  pageThirteen: String, 
  pageFourteen: String,
  pageFifteen: String, 
  pageSixteen: String, 
  pageSeventeen: String, 
  pageEighteen: String, 
  pageNineteen: String, 
  pageTwenty: String,
  pageTwentyOne: String,
  imageOne: { type: String, default: '/public/moon.png' },
  imageTwo: { type: String, default: '/public/moon.png' }, 
  imageThree:{ type: String, default: '/public/moon.png' }, 
  imageFour: { type: String, default: '/public/moon.png' }, 
  imageFive: { type: String, default: '/public/moon.png' }, 
  imageSix: { type: String, default: '/public/moon.png' },
  imageSeven: { type: String, default: '/public/moon.png' }, 
  imageEight: { type: String, default: '/public/moon.png' },
  imageNine: { type: String, default: '/public/moon.png' },
  imageTen: { type: String, default: '/public/moon.png' },
  imageEleven: { type: String, default: '/public/moon.png' },
  imageTwelve: { type: String, default: '/public/moon.png' }, 
  imageThirteen:{ type: String, default: '/public/moon.png' }, 
  imageFourteen: { type: String, default: '/public/moon.png' }, 
  imageFifteen: { type: String, default: '/public/moon.png' }, 
  imageSixteen: { type: String, default: '/public/moon.png' },
  imageSeventeen: { type: String, default: '/public/moon.png' }, 
  imageEighteen: { type: String, default: '/public/moon.png' },
  imageNineteen: { type: String, default: '/public/moon.png' },
  imageTwenty: { type: String, default: '/public/moon.png' },
  imageMoon: { type: String, default: '/public/moon.png' },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});


module.exports = mongoose.model("Book", BookSchema);