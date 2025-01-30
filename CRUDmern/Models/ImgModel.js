const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imgSchema = new Schema({
  image: { type: String, required: true },
  
  
});

module.exports = mongoose.model("ImageModel", imgSchema);