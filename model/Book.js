const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//user model
const BookSchema = new Schema({
  name: String,
  category: String,
  photos: String,
  recording: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});


module.exports = mongoose.model("Book", BookSchema);