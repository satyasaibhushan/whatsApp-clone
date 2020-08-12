const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    socketID: { type: String, required: true, min: 6, max: 255 }
  });


const userSchema = new mongoose.Schema({
    name:{
        type : String,
        required: true,
        min: 6,
        max: 255,
    },
    email:{
        type : String,
        required: true,
        min: 6,
        max: 255,
    },
    password:{
        type : String,
        required: true,
        min: 8,
        max: 511,
    },
    contacts:{
        type:[contactSchema]
    },
    date:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model("user",userSchema)