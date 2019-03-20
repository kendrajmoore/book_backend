const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//video model
const VideoSchema = new Schema({
  name: String,
  url: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});


module.exports = mongoose.model("Video", VideoSchema);