const mongoose = require("mongoose");

const categarySchema = new mongoose.Schema({
    heading:{
        type: String,
        required: true
       },
       image:{
        type:String
       },
      text:
       {
         type: String
    },
    imageId:{
      type: String,
      required:true
    },
  });

const uploadImage = new mongoose.model('uploadImage', categarySchema);
module.exports = uploadImage;