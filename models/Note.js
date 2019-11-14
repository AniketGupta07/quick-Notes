const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  }
});
module.exports = Note = mongoose.model("notes", UserSchema);