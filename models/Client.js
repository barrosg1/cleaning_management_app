const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  company: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  location: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },
  website: {
    type: String,
    default: ""
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("clients", clientSchema);
